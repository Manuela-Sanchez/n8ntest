#!/usr/bin/env python3
"""
Script de análisis de workflows de n8n
Proporciona estadísticas y visualización de la estructura del workflow
"""

import json
import sys
from collections import Counter, defaultdict
from typing import Dict, List


def load_workflow(file_path: str) -> Dict:
    """Carga el archivo JSON del workflow"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {file_path}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ Error al parsear JSON: {e}")
        sys.exit(1)


def analyze_nodes(nodes: List[Dict]) -> Dict:
    """Analiza los nodos del workflow"""
    node_types = Counter(node.get('type', 'unknown') for node in nodes)
    node_names = [node.get('name', 'unnamed') for node in nodes]

    # Detectar duplicados por nombre
    name_counts = Counter(node_names)
    duplicates = {name: count for name, count in name_counts.items() if count > 1}

    return {
        'total': len(nodes),
        'types': dict(node_types),
        'names': node_names,
        'duplicates': duplicates
    }


def analyze_connections(connections: Dict) -> Dict:
    """Analiza las conexiones entre nodos"""
    total_connections = 0
    connection_types = defaultdict(int)

    for source_node, outputs in connections.items():
        for output_type, output_list in outputs.items():
            if output_list:
                for connections_list in output_list:
                    if connections_list:
                        total_connections += len(connections_list)
                        connection_types[output_type] += len(connections_list)

    return {
        'total': total_connections,
        'by_type': dict(connection_types),
        'nodes_with_connections': len(connections)
    }


def find_entry_points(nodes: List[Dict]) -> List[str]:
    """Encuentra los nodos de entrada (triggers)"""
    triggers = []
    trigger_keywords = ['trigger', 'webhook', 'schedule', 'manual']

    for node in nodes:
        node_type = node.get('type', '').lower()
        node_name = node.get('name', '').lower()

        if any(keyword in node_type or keyword in node_name for keyword in trigger_keywords):
            triggers.append(node.get('name', 'unnamed'))

    return triggers


def find_isolated_nodes(nodes: List[Dict], connections: Dict) -> List[str]:
    """Encuentra nodos sin conexiones"""
    all_connected_nodes = set()

    # Nodos que tienen conexiones salientes
    all_connected_nodes.update(connections.keys())

    # Nodos que tienen conexiones entrantes
    for outputs in connections.values():
        for output_list in outputs.values():
            if output_list:
                for connection_list in output_list:
                    if connection_list:
                        for conn in connection_list:
                            all_connected_nodes.add(conn.get('node'))

    # Nodos aislados
    all_node_names = {node.get('name') for node in nodes}
    isolated = all_node_names - all_connected_nodes

    return list(isolated)


def analyze_credentials(nodes: List[Dict]) -> Dict:
    """Analiza las credenciales utilizadas"""
    credentials_used = defaultdict(set)

    for node in nodes:
        if 'credentials' in node:
            for cred_type, cred_info in node['credentials'].items():
                if isinstance(cred_info, dict):
                    cred_name = cred_info.get('name', 'unnamed')
                    credentials_used[cred_type].add(cred_name)

    return {cred_type: list(names) for cred_type, names in credentials_used.items()}


def print_report(workflow: Dict):
    """Imprime un reporte detallado del workflow"""
    nodes = workflow.get('nodes', [])
    connections = workflow.get('connections', {})
    name = workflow.get('name', 'Sin nombre')

    print("=" * 70)
    print(f"📊 ANÁLISIS DE WORKFLOW: {name}")
    print("=" * 70)

    # Información básica
    print(f"\n📝 INFORMACIÓN BÁSICA")
    print(f"{'─' * 70}")
    print(f"  Nombre: {name}")
    print(f"  ID: {workflow.get('id', 'N/A')}")
    print(f"  Activo: {'✅ Sí' if workflow.get('active') else '❌ No'}")

    # Análisis de nodos
    print(f"\n🔷 NODOS")
    print(f"{'─' * 70}")
    node_analysis = analyze_nodes(nodes)
    print(f"  Total de nodos: {node_analysis['total']}")

    print(f"\n  Tipos de nodos:")
    for node_type, count in sorted(node_analysis['types'].items(), key=lambda x: x[1], reverse=True):
        node_type_short = node_type.split('.')[-1] if '.' in node_type else node_type
        print(f"    • {node_type_short}: {count}")

    # Duplicados
    if node_analysis['duplicates']:
        print(f"\n  ⚠️  Nodos duplicados detectados:")
        for name, count in sorted(node_analysis['duplicates'].items(), key=lambda x: x[1], reverse=True):
            print(f"    • {name}: {count} copias")

    # Puntos de entrada
    print(f"\n🚪 PUNTOS DE ENTRADA (Triggers)")
    print(f"{'─' * 70}")
    entry_points = find_entry_points(nodes)
    if entry_points:
        for i, trigger in enumerate(entry_points, 1):
            print(f"  {i}. {trigger}")
    else:
        print("  ⚠️  No se detectaron triggers")

    # Análisis de conexiones
    print(f"\n🔗 CONEXIONES")
    print(f"{'─' * 70}")
    conn_analysis = analyze_connections(connections)
    print(f"  Total de conexiones: {conn_analysis['total']}")
    print(f"  Nodos con conexiones: {conn_analysis['nodes_with_connections']}")

    if conn_analysis['by_type']:
        print(f"\n  Tipos de conexiones:")
        for conn_type, count in conn_analysis['by_type'].items():
            print(f"    • {conn_type}: {count}")

    # Nodos aislados
    isolated = find_isolated_nodes(nodes, connections)
    if isolated:
        print(f"\n⚠️  NODOS AISLADOS (sin conexiones)")
        print(f"{'─' * 70}")
        for node in isolated:
            print(f"  • {node}")

    # Credenciales
    print(f"\n🔐 CREDENCIALES UTILIZADAS")
    print(f"{'─' * 70}")
    creds = analyze_credentials(nodes)
    if creds:
        for cred_type, names in creds.items():
            print(f"  {cred_type}:")
            for name in names:
                print(f"    • {name}")
    else:
        print("  ℹ️  No se detectaron credenciales configuradas")

    # Estadísticas adicionales
    print(f"\n📈 ESTADÍSTICAS ADICIONALES")
    print(f"{'─' * 70}")

    # Calcular complejidad
    avg_connections = conn_analysis['total'] / max(len(nodes), 1)
    print(f"  Promedio de conexiones por nodo: {avg_connections:.2f}")

    # Estimación de complejidad
    if avg_connections < 1.5:
        complexity = "Baja ✅"
    elif avg_connections < 3:
        complexity = "Media ⚠️"
    else:
        complexity = "Alta 🔴"

    print(f"  Complejidad estimada: {complexity}")

    # Calcular redundancia
    redundancy_pct = 0
    if node_analysis['duplicates']:
        total_duplicates = sum(count - 1 for count in node_analysis['duplicates'].values())
        redundancy_pct = (total_duplicates / node_analysis['total']) * 100
        print(f"  Redundancia: {redundancy_pct:.1f}% ({total_duplicates} nodos duplicados)")
    else:
        print(f"  Redundancia: 0% (sin duplicados) ✅")

    print(f"\n{'=' * 70}")

    # Recomendaciones
    print(f"\n💡 RECOMENDACIONES")
    print(f"{'─' * 70}")

    recommendations = []

    if node_analysis['duplicates']:
        recommendations.append("• Ejecutar script de limpieza para eliminar nodos duplicados")

    if isolated:
        recommendations.append(f"• Revisar {len(isolated)} nodos aislados y eliminar si no son necesarios")

    if avg_connections > 4:
        recommendations.append("• Considerar dividir el workflow en sub-workflows para mejor mantenibilidad")

    if not entry_points:
        recommendations.append("• Agregar al menos un trigger para activar el workflow")

    if not recommendations:
        recommendations.append("✅ El workflow está bien estructurado")

    for rec in recommendations:
        print(f"  {rec}")

    print(f"\n{'=' * 70}\n")


def main():
    """Función principal"""
    if len(sys.argv) < 2:
        print("📝 Uso: python analyze_workflow.py <archivo_workflow.json>")
        print("\nEjemplo:")
        print("  python analyze_workflow.py workflow.json")
        sys.exit(1)

    input_file = sys.argv[1]

    # Cargar y analizar workflow
    workflow = load_workflow(input_file)
    print_report(workflow)


if __name__ == "__main__":
    main()
