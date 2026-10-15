/* ==========================================================================
   Main JavaScript File (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Elements Selection
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    const dropdownItems = document.querySelectorAll('.dropdown');

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
});
