/* ==========================================================================
   GarbaExpress - Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // ==========================================================================
  // 1. Sticky Navigation & Scroll Progress
  // ==========================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 2. Mobile Menu Toggle
  // ==========================================================================
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Active Nav Link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-10% 0px -60% 0px'
  });

  sections.forEach(sec => scrollObserver.observe(sec));

  // ==========================================================================
  // 4. FAQ Accordion Toggle
  // ==========================================================================
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Close all other open items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. Toast Notification System
  // ==========================================================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'default') {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    
    // Icon based on type
    const icon = type === 'success' ? '✓' : 'ℹ';
    
    toast.innerHTML = `
      <div class="badge-icon ${type === 'success' ? '' : 'badge-icon-secondary'}" style="width: 28px; height: 28px; font-size: 0.85rem;">
        ${icon}
      </div>
      <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger CSS slide-in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ==========================================================================
  // 6. Interactive Order Simulator & Modal
  // ==========================================================================
  const orderModal = document.getElementById('order-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const openModalBtns = document.querySelectorAll('.js-open-order');
  const simForm = document.getElementById('order-sim-form');
  const successScreen = document.getElementById('order-success-screen');
  
  // Pricing configuration
  const formulaPricing = {
    classique: { name: 'Le Classique (Dahico)', price: 1500 },
    premium: { name: 'Le GarbaExpress (Premium)', price: 3000 },
    giga: { name: 'Le Garba Boss (Giga)', price: 5000 }
  };

  const addonPricing = {
    avocat: { name: 'Avocat Crémeux', price: 500 },
    alloco: { name: 'Bananes Alloco', price: 500 },
    boisson: { name: 'Boisson Fraîche', price: 500 }
  };

  // State
  let currentOrder = {
    formula: 'premium', // Default selection
    chili: 'moyen', // Default chili
    addons: [],
    phone: '',
    address: ''
  };

  // Open Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const presetFormula = btn.getAttribute('data-formula');
      if (presetFormula && formulaPricing[presetFormula]) {
        currentOrder.formula = presetFormula;
      }
      
      // Update UI selection states in modal
      updateFormulaSelectionUI();
      calculateTotal();
      
      // Reset form & screen states
      if (simForm) simForm.style.display = 'block';
      if (successScreen) successScreen.style.display = 'none';
      
      orderModal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close Modal
  const closeModal = () => {
    orderModal.classList.remove('open');
    document.body.style.overflow = ''; // Release background scroll
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeModal();
    });
  }

  // Option Selections: Formulas
  const formulaOptions = document.querySelectorAll('.js-formula-select');
  formulaOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      currentOrder.formula = opt.getAttribute('data-value');
      updateFormulaSelectionUI();
      calculateTotal();
    });
  });

  function updateFormulaSelectionUI() {
    formulaOptions.forEach(opt => {
      const val = opt.getAttribute('data-value');
      if (val === currentOrder.formula) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  // Option Selections: Chili Levels
  const chiliBtns = document.querySelectorAll('.js-chili-btn');
  chiliBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentOrder.chili = btn.getAttribute('data-value');
      chiliBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Option Selections: Addons
  const addonItems = document.querySelectorAll('.js-addon-item');
  addonItems.forEach(item => {
    item.addEventListener('click', () => {
      const val = item.getAttribute('data-value');
      const index = currentOrder.addons.indexOf(val);
      
      if (index === -1) {
        currentOrder.addons.push(val);
        item.classList.add('selected');
      } else {
        currentOrder.addons.splice(index, 1);
        item.classList.remove('selected');
      }
      calculateTotal();
    });
  });

  // Price Calculation & UI Update
  const summaryFormulaName = document.getElementById('summary-formula-name');
  const summaryFormulaPrice = document.getElementById('summary-formula-price');
  const summaryAddonsList = document.getElementById('summary-addons-list');
  const summaryTotalPrice = document.getElementById('summary-total-price');

  function calculateTotal() {
    const fData = formulaPricing[currentOrder.formula];
    let total = fData.price;
    
    // Formula UI
    if (summaryFormulaName) summaryFormulaName.textContent = fData.name;
    if (summaryFormulaPrice) summaryFormulaPrice.textContent = `${fData.price.toLocaleString()} FCFA`;
    
    // Addons calc & UI
    let addonsHTML = '';
    currentOrder.addons.forEach(addonKey => {
      const aData = addonPricing[addonKey];
      if (aData) {
        total += aData.price;
        addonsHTML += `
          <div class="summary-row" style="margin-bottom: 6px;">
            <span>+ ${aData.name}</span>
            <span>${aData.price.toLocaleString()} FCFA</span>
          </div>
        `;
      }
    });
    
    if (summaryAddonsList) summaryAddonsList.innerHTML = addonsHTML;
    if (summaryTotalPrice) summaryTotalPrice.textContent = `${total.toLocaleString()} FCFA`;
    
    currentOrder.total = total;
  }

  // Order Submission Simulation
  if (simForm) {
    simForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const phoneInput = document.getElementById('order-phone');
      const addressInput = document.getElementById('order-address');
      
      const phoneVal = phoneInput.value.trim();
      const addressVal = addressInput.value.trim();
      
      // Ivorian phone validation: 10 digits starting with 01, 05, 07 (or simple 10 digit match)
      const phoneRegex = /^(01|05|07|\+225|225)?[0-9]{8,10}$/;
      
      if (!phoneVal || !phoneRegex.test(phoneVal.replace(/\s/g, ''))) {
        showToast('Veuillez entrer un numéro de téléphone ivoirien valide.', 'error');
        phoneInput.focus();
        return;
      }
      
      if (!addressVal || addressVal.length < 3) {
        showToast('Veuillez préciser votre quartier/adresse à Sassandra.', 'error');
        addressInput.focus();
        return;
      }
      
      // Success triggers
      currentOrder.phone = phoneVal;
      currentOrder.address = addressVal;
      
      // Update success screen details
      const orderRef = document.getElementById('success-order-ref');
      const orderQuartier = document.getElementById('success-order-quartier');
      
      if (orderRef) orderRef.textContent = `GE-${Math.floor(100000 + Math.random() * 900000)}`;
      if (orderQuartier) orderQuartier.textContent = addressVal;
      
      // Transition display inside modal
      simForm.style.display = 'none';
      successScreen.style.display = 'flex';
      
      showToast('Commande envoyée avec succès !', 'success');
      
      // Reset inputs & state
      phoneInput.value = '';
      addressInput.value = '';
      currentOrder.addons = [];
      document.querySelectorAll('.js-addon-item').forEach(item => item.classList.remove('selected'));
    });
  }

  // Close Success Screen Btn
  const closeSuccessBtn = document.getElementById('close-success-btn');
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeModal);
  }

  // ==========================================================================
  // 7. Contact Form Simulation
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      if (!name || !message) {
        showToast('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
      }
      
      showToast(`Merci ${name}, votre message a bien été transmis.`, 'success');
      contactForm.reset();
    });
  }

  // ==========================================================================
  // 8. Newsletter Form Simulation
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const email = emailInput.value.trim();
      
      if (!email || !email.includes('@')) {
        showToast('Veuillez entrer une adresse email valide.', 'error');
        return;
      }
      
      showToast('Inscription réussie ! Vous recevrez nos promos Garba.', 'success');
      emailInput.value = '';
    });
  }
});
