// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.show-card, .feature-card, .hero-content, .hero-image');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Form Validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Este campo es obligatorio';
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Por favor ingresa un email válido';
                }
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Por favor ingresa un teléfono válido';
                }
            }
        }
        
        // Date of birth validation
        if (field.type === 'date' && field.value.trim()) {
            const birthDate = new Date(field.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            // Check if birthday hasn't occurred this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (birthDate >= today) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'La fecha de nacimiento debe ser anterior a hoy';
                }
            } else if (age < 13) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Debes tener al menos 13 años para registrarte';
                }
            } else if (age > 120) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Por favor verifica tu fecha de nacimiento';
                }
            }
        }
        
        // Password confirmation validation
        if (field.name === 'confirmPassword' && field.value.trim()) {
            const passwordField = form.querySelector('#password');
            if (passwordField && field.value !== passwordField.value) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Las contraseñas no coinciden';
                }
            }
        }
        
        // Password strength validation
        if (field.name === 'password' && field.value.trim()) {
            const password = field.value;
            if (password.length < 8) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'La contraseña debe tener al menos 8 caracteres';
                }
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'La contraseña debe contener mayúsculas, minúsculas y números';
                }
            }
        }
    });
    
    return isValid;
}

// Form Submission Handler
function handleFormSubmission(form, successMessage) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(form)) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Procesando...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.textContent = successMessage;
                form.insertBefore(successDiv, form.firstChild);
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
                
            }, 2000);
        }
    });
}

// Real-time validation
function setupRealTimeValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validate on blur (when user leaves the field)
            input.addEventListener('blur', function() {
                validateField(this, form);
            });
            
            // Validate on input for password confirmation
            if (input.name === 'confirmPassword') {
                input.addEventListener('input', function() {
                    const passwordField = form.querySelector('#password');
                    if (passwordField && passwordField.value) {
                        validateField(this, form);
                    }
                });
            }
            
            // Clear errors on focus
            input.addEventListener('focus', function() {
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    });
}

// Validate individual field
function validateField(field, form) {
    const errorElement = field.parentNode.querySelector('.error-message');
    
    // Clear previous errors
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = 'Este campo es obligatorio';
        }
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Por favor ingresa un email válido';
            }
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Por favor ingresa un teléfono válido';
            }
            return false;
        }
    }
    
    // Date of birth validation
    if (field.type === 'date' && field.value.trim()) {
        const birthDate = new Date(field.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (birthDate >= today) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'La fecha de nacimiento debe ser anterior a hoy';
            }
            return false;
        } else if (age < 13) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Debes tener al menos 13 años para registrarte';
            }
            return false;
        } else if (age > 120) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Por favor verifica tu fecha de nacimiento';
            }
            return false;
        }
    }
    
    // Password confirmation validation
    if (field.name === 'confirmPassword' && field.value.trim()) {
        const passwordField = form.querySelector('#password');
        if (passwordField && field.value !== passwordField.value) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Las contraseñas no coinciden';
            }
            return false;
        }
    }
    
    // Password strength validation
    if (field.name === 'password' && field.value.trim()) {
        const password = field.value;
        if (password.length < 8) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'La contraseña debe tener al menos 8 caracteres';
            }
            return false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'La contraseña debe contener mayúsculas, minúsculas y números';
            }
            return false;
        }
    }
    
    return true;
}

// Initialize form handlers
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        handleFormSubmission(registrationForm, '¡Registro exitoso! Te hemos enviado un email de confirmación.');
    }
    
    const purchaseForm = document.getElementById('purchaseForm');
    if (purchaseForm) {
        handleFormSubmission(purchaseForm, '¡Compra realizada con éxito! Recibirás las entradas por email.');
    }
    
    // Setup real-time validation
    setupRealTimeValidation();
    
    // Initialize search and filters
    initializeSearchAndFilters();
});

// Ticket Selection Functionality
function selectTicket(showId, ticketType, price) {
    const selectedTickets = JSON.parse(localStorage.getItem('selectedTickets') || '{}');
    
    if (!selectedTickets[showId]) {
        selectedTickets[showId] = {};
    }
    
    selectedTickets[showId][ticketType] = {
        price: price,
        quantity: (selectedTickets[showId][ticketType]?.quantity || 0) + 1
    };
    
    localStorage.setItem('selectedTickets', JSON.stringify(selectedTickets));
    updateCartDisplay();
}

function removeTicket(showId, ticketType) {
    const selectedTickets = JSON.parse(localStorage.getItem('selectedTickets') || '{}');
    
    if (selectedTickets[showId] && selectedTickets[showId][ticketType]) {
        selectedTickets[showId][ticketType].quantity -= 1;
        
        if (selectedTickets[showId][ticketType].quantity <= 0) {
            delete selectedTickets[showId][ticketType];
        }
        
        if (Object.keys(selectedTickets[showId]).length === 0) {
            delete selectedTickets[showId];
        }
    }
    
    localStorage.setItem('selectedTickets', JSON.stringify(selectedTickets));
    updateCartDisplay();
}

function updateCartDisplay() {
    const selectedTickets = JSON.parse(localStorage.getItem('selectedTickets') || '{}');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    let totalItems = 0;
    let totalPrice = 0;
    
    Object.values(selectedTickets).forEach(showTickets => {
        Object.values(showTickets).forEach(ticket => {
            totalItems += ticket.quantity;
            totalPrice += ticket.price * ticket.quantity;
        });
    });
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    if (cartTotal) {
        cartTotal.textContent = `$${totalPrice.toLocaleString()}`;
    }
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});

// Search Functionality
function searchShows(query) {
    const showCards = document.querySelectorAll('.show-card');
    const searchTerm = query.toLowerCase();
    
    showCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.show-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter Functionality
function filterShows(category) {
    const showCards = document.querySelectorAll('.show-card');
    
    showCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Combined search and filter functionality
function performSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const activeFilter = document.querySelector('.filter-btn.active');
    
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
    
    const showCards = document.querySelectorAll('.show-card');
    let visibleCount = 0;
    
    showCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.show-description').textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        
        // Check if card matches search term
        const matchesSearch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);
        
        // Check if card matches category filter
        const matchesCategory = category === 'all' || cardCategory === category;
        
        // Show card only if it matches both search and category
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    showNoResultsMessage(visibleCount === 0 && (searchTerm !== '' || category !== 'all'));
}

// Show no results message
function showNoResultsMessage(show) {
    let noResultsMsg = document.getElementById('no-results-message');
    
    if (show && !noResultsMsg) {
        // Create no results message
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results-message';
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>No se encontraron espectáculos</h3>
                <p>Intenta con otros términos de búsqueda o cambia el filtro</p>
                <button class="btn btn-primary" onclick="clearFilters()">
                    <i class="fas fa-refresh"></i>
                    Limpiar filtros
                </button>
            </div>
        `;
        
        // Insert after the shows grid
        const showsGrid = document.querySelector('.shows-grid');
        if (showsGrid) {
            showsGrid.parentNode.insertBefore(noResultsMsg, showsGrid.nextSibling);
        }
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Clear all filters function
function clearFilters() {
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const allButton = document.querySelector('.filter-btn[data-category="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    // Show all cards
    const showCards = document.querySelectorAll('.show-card');
    showCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Hide no results message
    showNoResultsMessage(false);
}

// Initialize search and filter functionality
function initializeSearchAndFilters() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            performSearchAndFilter();
        });
    }
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Perform combined search and filter
            performSearchAndFilter();
        });
    });
}

// Date Picker Enhancement
function initializeDatePicker() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.max = today;
    });
}

// Initialize date pickers
document.addEventListener('DOMContentLoaded', function() {
    initializeDatePicker();
});

// Show/Hide Password
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentNode.querySelector('.password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        toggle.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Modal Functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Loading States
function showLoading(element) {
    element.innerHTML = '<span class="loading"></span> Cargando...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'CLP'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Export functions for use in other scripts
window.TeatroXYZ = {
    selectTicket,
    removeTicket,
    updateCartDisplay,
    searchShows,
    filterShows,
    showToast,
    formatCurrency,
    formatDate,
    clearFilters
};

// Make clearFilters globally available
window.clearFilters = clearFilters;
