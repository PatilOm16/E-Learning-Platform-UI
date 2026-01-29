// Filter functionality
const filterTabs = document.querySelectorAll('.filter-tab');
const courseCards = document.querySelectorAll('.course-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        // Filter courses
        courseCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Course card click to open modal
courseCards.forEach(card => {
    card.addEventListener('click', () => {
        const courseTitle = card.querySelector('.course-title').textContent;
        const courseDescription = card.querySelector('.course-description').textContent;
        
        document.getElementById('modalTitle').textContent = courseTitle;
        document.getElementById('modalDescription').textContent = courseDescription;
        document.getElementById('courseModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal function
function closeModal() {
    document.getElementById('courseModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on backdrop click
document.getElementById('courseModal').addEventListener('click', (e) => {
    if (e.target.id === 'courseModal') {
        closeModal();
    }
});

// Close modal on ESC key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth scroll for progress link
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

// Animate progress bars on scroll
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress-bar-fill');
            fills.forEach(fill => {
                // Trigger animation by setting width
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

const progressSection = document.querySelector('.progress-section');
if (progressSection) {
    progressObserver.observe(progressSection);
}

// Video player interaction
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        alert('Video player would start here! In a real implementation, this would load the actual video content.');
    });
}

// CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Dashboard link
const dashboardLink = document.getElementById('dashboardLink');
if (dashboardLink) {
    dashboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        const progressSection = document.getElementById('progress');
        if (progressSection) {
            progressSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lesson item interactions
document.addEventListener('click', (e) => {
    if (e.target.closest('.lesson-item')) {
        const lessonItem = e.target.closest('.lesson-item');
        const lessonTitle = lessonItem.querySelector('h4').textContent;
        alert(`Starting lesson: ${lessonTitle}`);
    }
});

// Add hover effect to stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Loading animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add subtle animation to course cards on hover
courseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

// Create dynamic course data (for future expansion)
const coursesData = {
    'web-dev': {
        title: 'Complete Web Development Bootcamp',
        instructor: 'Alex Smith',
        duration: '24 Hours',
        lessons: 45,
        level: 'Beginner',
        description: 'Master modern web development from scratch. This comprehensive course covers everything from HTML & CSS fundamentals to advanced React and Node.js development.'
    },
    'ui-ux': {
        title: 'UI/UX Design Masterclass',
        instructor: 'Maria Johnson',
        duration: '18 Hours',
        lessons: 32,
        level: 'Intermediate',
        description: 'Learn design thinking, wireframing, prototyping with Figma and create stunning user experiences that users love.'
    },
    'python-ds': {
        title: 'Python for Data Science',
        instructor: 'David Lee',
        duration: '30 Hours',
        lessons: 52,
        level: 'Beginner',
        description: 'Master Python, pandas, NumPy, and machine learning fundamentals for data analysis and visualization.'
    },
    'react': {
        title: 'Advanced React & Redux',
        instructor: 'Sarah Kim',
        duration: '20 Hours',
        lessons: 38,
        level: 'Advanced',
        description: 'Deep dive into React hooks, context API, Redux toolkit and build scalable, production-ready applications.'
    },
    'graphic': {
        title: 'Graphic Design Fundamentals',
        instructor: 'John Davis',
        duration: '16 Hours',
        lessons: 28,
        level: 'Beginner',
        description: 'Master Adobe Illustrator, Photoshop and create professional designs for both print and digital media.'
    },
    'ml': {
        title: 'Machine Learning A-Z',
        instructor: 'Emma Parker',
        duration: '35 Hours',
        lessons: 60,
        level: 'Advanced',
        description: 'Learn supervised, unsupervised learning, neural networks and deploy production-ready ML models.'
    }
};

console.log('E-Learning Platform initialized successfully!');
console.log('Available courses:', Object.keys(coursesData).length);
