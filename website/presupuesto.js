// ===== CALCULADORA DE PRESUPUESTO - IA AVANZA =====

// Estado global
const budgetState = {
    selectedServices: new Map(),
    hours: 10,
    subtotal: 0,
    discount: 0,
    total: 0,
    discountPercent: 0
};

// Planes predefinidos
const presetPlans = {
    emprendedor: {
        hours: 10,
        services: ['gestion-emails', 'agenda', 'redes-sociales']
    },
    profesional: {
        hours: 20,
        services: ['gestion-emails', 'agenda', 'redes-sociales', 'atencion-cliente', 'facturacion']
    },
    business: {
        hours: 40,
        services: [
            'gestion-emails', 'agenda', 'redes-sociales', 'atencion-cliente',
            'facturacion', 'coordinacion-proyectos', 'informes', 'crm', 'automatizacion'
        ]
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeCalculator();
    attachEventListeners();
});

// Inicializar calculadora
function initializeCalculator() {
    // Actualizar valor inicial del slider
    updateHoursDisplay();
    updateBudget();
}

// Adjuntar event listeners
function attachEventListeners() {
    // Checkboxes de servicios
    const checkboxes = document.querySelectorAll('.service-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleServiceToggle);
    });

    // Slider de horas
    const hoursSlider = document.getElementById('hoursSlider');
    hoursSlider.addEventListener('input', handleHoursChange);

    // Botón limpiar todo
    const clearAllBtn = document.getElementById('clearAll');
    clearAllBtn.addEventListener('click', clearAllServices);

    // Botones de planes predefinidos
    const presetButtons = document.querySelectorAll('.load-preset');
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.getAttribute('data-preset');
            loadPresetPlan(preset);
        });
    });

    // Botón descargar PDF
    const downloadPDFBtn = document.getElementById('downloadPDF');
    downloadPDFBtn.addEventListener('click', downloadPDF);

    // Botón enviar presupuesto
    const sendBudgetBtn = document.getElementById('sendBudget');
    sendBudgetBtn.addEventListener('click', sendBudgetToTelegram);

    // Headers de categorías (expandir/contraer)
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', toggleCategory);
    });
}

// Toggle servicio seleccionado
function handleServiceToggle(e) {
    const checkbox = e.target;
    const serviceId = checkbox.getAttribute('data-service');
    const serviceName = checkbox.closest('.service-item').querySelector('.service-name').textContent;
    const servicePrice = parseFloat(checkbox.getAttribute('data-price'));
    const category = checkbox.getAttribute('data-category');

    if (checkbox.checked) {
        budgetState.selectedServices.set(serviceId, {
            name: serviceName,
            price: servicePrice,
            category: category
        });
    } else {
        budgetState.selectedServices.delete(serviceId);
    }

    updateCategoryCount(category);
    updateSelectedList();
    updateBudget();
}

// Cambio en horas
function handleHoursChange(e) {
    budgetState.hours = parseInt(e.target.value);
    updateHoursDisplay();
    updateBudget();
}

// Actualizar display de horas
function updateHoursDisplay() {
    const hoursValue = document.getElementById('hoursValue');
    hoursValue.textContent = budgetState.hours;
}

// Actualizar contador de categoría
function updateCategoryCount(category) {
    const categoryElement = document.querySelector(`[data-category="${category}"]`).closest('.service-category');
    const countElement = categoryElement.querySelector('.category-count');

    const checkboxes = categoryElement.querySelectorAll('input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    countElement.textContent = `${checkedCount} seleccionados`;

    if (checkedCount > 0) {
        countElement.classList.add('active');
    } else {
        countElement.classList.remove('active');
    }
}

// Actualizar lista de servicios seleccionados
function updateSelectedList() {
    const selectedList = document.getElementById('selectedList');

    if (budgetState.selectedServices.size === 0) {
        selectedList.innerHTML = '<p class="empty-state">No hay servicios seleccionados</p>';
        return;
    }

    let html = '';
    budgetState.selectedServices.forEach((service, id) => {
        html += `
            <div class="selected-item">
                <span class="selected-item-name">${service.name}</span>
                <span class="selected-item-price">${service.price}€/h</span>
            </div>
        `;
    });

    selectedList.innerHTML = html;
}

// Calcular descuento por volumen
function calculateDiscount(hours) {
    if (hours >= 80) return 20;
    if (hours >= 40) return 15;
    if (hours >= 20) return 10;
    if (hours >= 10) return 5;
    return 0;
}

// Actualizar presupuesto
function updateBudget() {
    const hours = budgetState.hours;

    // Si no hay servicios seleccionados
    if (budgetState.selectedServices.size === 0) {
        budgetState.subtotal = 0;
        budgetState.discount = 0;
        budgetState.total = 0;
        budgetState.discountPercent = 0;
        updateBudgetDisplay();
        return;
    }

    // Calcular precio promedio de servicios seleccionados
    let totalPrice = 0;
    budgetState.selectedServices.forEach(service => {
        totalPrice += service.price;
    });
    const avgPrice = totalPrice / budgetState.selectedServices.size;

    // Calcular subtotal
    budgetState.subtotal = avgPrice * hours;

    // Calcular descuento
    budgetState.discountPercent = calculateDiscount(hours);
    budgetState.discount = budgetState.subtotal * (budgetState.discountPercent / 100);

    // Calcular total
    budgetState.total = budgetState.subtotal - budgetState.discount;

    updateBudgetDisplay();
}

// Actualizar display del presupuesto
function updateBudgetDisplay() {
    document.getElementById('subtotal').textContent = `${Math.round(budgetState.subtotal)}€`;
    document.getElementById('discount').textContent = `-${Math.round(budgetState.discount)}€`;
    document.getElementById('discountPercent').textContent = `(${budgetState.discountPercent}%)`;
    document.getElementById('total').innerHTML = `<strong>${Math.round(budgetState.total)}€</strong>`;

    // Precio promedio por hora
    const avgHourlyRate = budgetState.total / budgetState.hours;
    document.getElementById('avgPrice').textContent = isNaN(avgHourlyRate) ? '0€/h' : `${Math.round(avgHourlyRate)}€/h`;
}

// Limpiar todos los servicios
function clearAllServices() {
    const checkboxes = document.querySelectorAll('.service-item input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
    });

    budgetState.selectedServices.clear();

    // Actualizar todos los contadores de categorías
    document.querySelectorAll('.category-count').forEach(count => {
        count.textContent = '0 seleccionados';
        count.classList.remove('active');
    });

    updateSelectedList();
    updateBudget();
}

// Cargar plan predefinido
function loadPresetPlan(presetName) {
    const preset = presetPlans[presetName];
    if (!preset) return;

    // Limpiar selección actual
    clearAllServices();

    // Actualizar horas
    budgetState.hours = preset.hours;
    document.getElementById('hoursSlider').value = preset.hours;
    updateHoursDisplay();

    // Seleccionar servicios del plan
    preset.services.forEach(serviceId => {
        const checkbox = document.querySelector(`input[data-service="${serviceId}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }
    });

    // Scroll suave a la calculadora
    document.querySelector('.budget-calculator').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Mostrar notificación
    showNotification(`Plan ${presetName.charAt(0).toUpperCase() + presetName.slice(1)} cargado correctamente`, 'success');
}

// Toggle expandir/contraer categoría
function toggleCategory(e) {
    const categoryServices = e.currentTarget.nextElementSibling;
    const isExpanded = categoryServices.style.display !== 'none';

    categoryServices.style.display = isExpanded ? 'none' : 'block';
}

// Descargar PDF
function downloadPDF() {
    if (budgetState.selectedServices.size === 0) {
        showNotification('Selecciona al menos un servicio para descargar el presupuesto', 'error');
        return;
    }

    // Generar contenido del presupuesto
    let content = `PRESUPUESTO PERSONALIZADO - IA AVANZA\n`;
    content += `=========================================\n\n`;
    content += `Horas mensuales: ${budgetState.hours}h\n\n`;
    content += `SERVICIOS SELECCIONADOS:\n`;
    content += `------------------------\n`;

    budgetState.selectedServices.forEach((service, id) => {
        content += `- ${service.name} (${service.price}€/h)\n`;
    });

    content += `\n`;
    content += `RESUMEN ECONÓMICO:\n`;
    content += `------------------\n`;
    content += `Subtotal: ${Math.round(budgetState.subtotal)}€\n`;
    content += `Descuento (${budgetState.discountPercent}%): -${Math.round(budgetState.discount)}€\n`;
    content += `TOTAL MENSUAL: ${Math.round(budgetState.total)}€\n\n`;
    content += `Precio promedio por hora: ${Math.round(budgetState.total / budgetState.hours)}€/h\n\n`;
    content += `---\n`;
    content += `Generado el: ${new Date().toLocaleDateString('es-ES')}\n`;
    content += `www.iaavanza.com | contacto@iaavanza.com | +34 645 407 994\n`;

    // Crear y descargar archivo
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presupuesto-iaavanza-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification('Presupuesto descargado correctamente', 'success');
}

// Enviar presupuesto a Telegram
function sendBudgetToTelegram() {
    if (budgetState.selectedServices.size === 0) {
        showNotification('Selecciona al menos un servicio antes de solicitar presupuesto', 'error');
        return;
    }

    // Generar mensaje para Telegram
    let message = `Hola! Quiero solicitar presupuesto para:\n\n`;
    message += `⏱️ ${budgetState.hours} horas/mes\n\n`;
    message += `📋 Servicios:\n`;

    budgetState.selectedServices.forEach((service, id) => {
        message += `- ${service.name}\n`;
    });

    message += `\n💰 Total estimado: ${Math.round(budgetState.total)}€/mes\n`;
    message += `(Descuento ${budgetState.discountPercent}% aplicado)`;

    // Encode para URL
    const encodedMessage = encodeURIComponent(message);

    // Abrir Telegram con mensaje pre-rellenado
    const telegramUrl = `https://t.me/IAvanza_Gestion_bot?start=presupuesto&text=${encodedMessage}`;
    window.open(telegramUrl, '_blank');

    showNotification('Abriendo chat con el bot de Telegram...', 'success');
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        font-family: var(--font-primary);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Inicializar todas las categorías como expandidas
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.category-services').forEach(el => {
        el.style.display = 'block';
    });
});

console.log('💰 Calculadora de Presupuesto IA Avanza cargada correctamente');
