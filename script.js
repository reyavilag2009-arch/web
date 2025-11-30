document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos del DOM
    const menuModules = document.querySelectorAll('.menu-module');
    const itemSelectedInput = document.getElementById('item-selected');
    const cantidadInput = document.getElementById('cantidad');
    const totalCostInput = document.getElementById('total-cost');
    const confirmButton = document.getElementById('confirm-button');
    const menestraRadios = document.querySelectorAll('input[name="menestra"]');

    let selectedItemPrice = 0;
    let selectedItemName = "Ninguno";
    let basePrice = 0;

    // --- FUNCIÓN DE CÁLCULO DE PRECIOS ---
    function updateTotal() {
        const cantidad = parseFloat(cantidadInput.value) || 1;
        const menestraChecked = document.querySelector('input[name="menestra"]:checked');
        
        const menestraPrice = menestraChecked ? parseFloat(menestraChecked.value) : 0.00;

        // Determinar el precio base y el estado del botón
        if (selectedItemName === "Ninguno") {
            basePrice = 0;
            confirmButton.disabled = true;
        } else {
            basePrice = selectedItemPrice;
            // Solo habilitar si hay un plato seleccionado
            confirmButton.disabled = false;
        }
        
        const unitCost = basePrice + menestraPrice;
        const total = unitCost * cantidad;
        
        totalCostInput.value = `$${total.toFixed(2)}`;
    }

    // --- MANEJO DE SELECCIÓN DE MÓDULOS ---
    menuModules.forEach(module => {
        module.addEventListener('click', () => {
            menuModules.forEach(m => m.classList.remove('selected'));
            module.classList.add('selected');

            selectedItemPrice = parseFloat(module.dataset.price);
            selectedItemName = module.dataset.item;
            
            itemSelectedInput.value = module.querySelector('h3').textContent; 
            
            updateTotal();
        });
    });

    // --- ESCUCHA DE CAMBIOS PARA CÁLCULOS ---
    cantidadInput.addEventListener('input', updateTotal);
    menestraRadios.forEach(radio => radio.addEventListener('change', updateTotal));
    
    // Inicializar el total y el estado del botón al cargar la página
    updateTotal(); 
    if (selectedItemName === "Ninguno") {
         confirmButton.disabled = true;
    }
    
});