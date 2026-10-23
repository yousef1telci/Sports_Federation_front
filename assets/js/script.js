/* ==========================================================================
   Main JavaScript File (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Elements Selection
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    const dropdownItems = document.querySelectorAll('.dropdown');

    // Search Modal Elements
    const searchOpenBtn = document.getElementById('searchOpenBtn');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchModal = document.getElementById('searchModal');
    const searchBackdrop = document.getElementById('searchBackdrop');
    const searchInput = document.getElementById('searchInput');

    // 1. Mobile Menu Toggle (Hamburger / Close)
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            
            // Toggle Icon between Bars and X-mark
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // 2. Mobile Dropdown Toggle (Touch friendly)
    dropdownItems.forEach((dropdown) => {
        const dropdownLink = dropdown.querySelector('a');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', (e) => {
                // Only intercept clicks in tablet/mobile viewports
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // 3. Close Mobile Menu on Outside Click
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active')) {
            const isClickInside = mainNav.contains(e.target) || (mobileMenuBtn && mobileMenuBtn.contains(e.target));
            if (!isClickInside) {
                closeMobileMenu();
            }
        }
    });

    // 4. Reset Mobile Menu on Window Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMobileMenu();
            dropdownItems.forEach((dropdown) => dropdown.classList.remove('active'));
        }
    });

    // Helper: Close Mobile Menu & Reset Icon
    function closeMobileMenu() {
        if (mainNav) {
            mainNav.classList.remove('active');
        }
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    // ==========================================================================
    // 5. Interactive Search Modal
    // ==========================================================================
    function openSearch() {
        if (searchModal) {
            searchModal.classList.add('active');
            searchModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 100);
        }
    }

    function closeSearch() {
        if (searchModal) {
            searchModal.classList.remove('active');
            searchModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (searchOpenBtn) {
        searchOpenBtn.addEventListener('click', openSearch);
    }

    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeSearch);
    }

    if (searchBackdrop) {
        searchBackdrop.addEventListener('click', closeSearch);
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });

    // ==========================================================================
    // 6. Generic Card Filtering (Competitions & News Hub)
    // ==========================================================================
    function setupFilter(containerId, cardSelector) {
        const filterContainer = document.getElementById(containerId);
        if (!filterContainer) return;

        const buttons = filterContainer.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll(cardSelector);

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                buttons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedFilter = btn.getAttribute('data-filter');

                cards.forEach((card) => {
                    const cardCategory = card.getAttribute('data-category');
                    if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                        card.style.display = '';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease';
                            card.style.opacity = '1';
                        }, 20);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize filters for Competitions & News
    setupFilter('compFilters', '.comp-card');
    setupFilter('newsFilters', '#newsGridExtended .news-card');

    // ==========================================================================
    // 7. World Rankings Category Tabs
    // ==========================================================================
    const rankTabs = document.querySelectorAll('.rank-tab-btn');
    if (rankTabs.length > 0) {
        rankTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                rankTabs.forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    // ==========================================================================
    // 8. Pagination Buttons Interaction
    // ==========================================================================
    const paginationButtons = document.querySelectorAll('.pagination-btn:not(.disabled)');
    if (paginationButtons.length > 0) {
        paginationButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const isNav = btn.querySelector('i');
                if (!isNav) {
                    paginationButtons.forEach((b) => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
        });
    }

    // ==========================================================================
    // 9. Official Contact Form Submission Handling
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (formAlert) {
                formAlert.style.display = 'flex';
                formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            contactForm.reset();
        });
    }
});
