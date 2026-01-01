// --- DATA CONFIGURATION ---
const projects = [
    {
        id: 1,
        tier: "Starter Tier",
        price: "₹17k - 25k",
        title: "The Standard",
        desc: "Static, fast, and fully AMFI compliant. Perfect for new distributors.",
        // 1. STATIC IMAGE (Shows on the main card)
        image: "assests/project1.png",
        // 2. LIVE GIF (Shows inside the modal sidebar)
        demoGif: "assests/Basic.gif",
        gradient: "linear-gradient(135deg, #1e3a8a, #000)",
        points: [
            {
                icon: "📊",
                title: "Integration",
                subtitle: "Simple Static Site.",
                text: "We update your site to latest standard as well as build new ones that follow SEBI circular and are simple yet professional."
            },
            {
                icon: "⚖️",
                title: "Mandatory Disclosures",
                subtitle: "Auto-injection of risk warnings.",
                text: "  We automatically inject the standard warning: Mutual Fund investments are subject to market risks, read all scheme related documents carefully on every page footer, add disclaimer , your disclouser rates , add link to code of conduct to ensuring you meet the SEBI Advertisement Code (Schedule VI) requirements without manual work."
            }
        ]
    
    },
    {
        id: 2,
        tier: "Moderate Tier",
        price: "₹27k - 37k",
        title: "BestSelling",
        desc: "Dynamic animations, hover effects, and user engagement features.",
        image: "./assests/project2.png",
        // Replace with your actual .gif file path
        demoGif: "assests/medium.gif",
        gradient: "linear-gradient(135deg, #581c87, #000)",
        points: [
            {
                icon: "🚀",
                title: "Dynamic Animation",
                subtitle: "Engage your visitors.",
                text: "Unlike the static tier, this tier includes scroll-triggered animations and hover effects that make your brand feel premium and alive."
            },
            {
                icon: "📝",
                title: "Blog Integration",
                subtitle: "SEO Friendly Content.",
                text: "Includes a CMS (Content Management System) so you can write and publish your own market updates and articles easily."
            }
        ]
        
    },

    {
        id: 3,
        tier: "Dynamic Tier",
        price: "₹40k - 50k",
        title: "Tech Savy",
        desc: "Full fintech dashboard capabilities with automated KYC integrations.",
        image: "assests/project3.png",
        // Replace with your actual .gif file path
        demoGif: "assests/tech savy.gif",
        gradient: "linear-gradient(135deg, #064e3b, #000)",
        points: [
            {
                icon: "🔐",
                title: "Visuallly Impressive",
                subtitle: "Immerse into new world",
                text: "Fully animated professionall tactial ui that can  lift your image to new heights "
            },
            {
                icon: "🆔",
                title: "Linking Funds",
                subtitle: " Live Performance of Funds.",
                text: "We can link the performace of all the mutal funds so that  you and your visiter scan look daily for theire performance"
            }
        ]
    
    }
];

// --- ELEMENTS ---
const container = document.getElementById('cardContainer');
const overlay = document.getElementById('overlay');
const scrollContent = document.getElementById('scrollContent');
const videoBox = document.getElementById('videoBox');

// --- 1. INITIALIZE ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Create Cards
    projects.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(p);
        
        // Stagger Animation
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-tier">${p.tier}</div>
                <div class="card-title">${p.title}</div>
                <div class="card-price">${p.price}</div>
            </div>
            
            <div class="card-visual" style="background: #000;">
                <div class="browser-header">
                    <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
                </div>
                <img src="${p.image}" style="width:100%; height:calc(100% - 36px); object-fit:cover; object-position:top; display:block; opacity: 0.8;" alt="${p.title}" />
            </div>
        `;
        container.appendChild(card);
    });

    // B. Activate Container
    setTimeout(() => {
        container.classList.add('active');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
    }, 50);
});

// --- 2. TAB SWITCHER ---
function switchTab(tab, btnElement) {
    const slider = document.getElementById('navSlider');
    const workTab = document.getElementById('cardContainer'); 
    const infoTab = document.getElementById('infoContainer');
    const hero = document.querySelector('.hero');
    
    let incoming, outgoing;
    
    if (tab === 'work') {
        slider.style.transform = 'translateX(0px)';
        incoming = workTab;
        outgoing = infoTab;
        
        // 1. BRING BACK HERO (Fade In)
        hero.style.display = 'block';
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 50);

    } else {
        slider.style.transform = 'translateX(80px)';
        incoming = infoTab;
        outgoing = workTab;
        
        // 2. HIDE HERO (Fade Out)
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            hero.style.display = 'none';
        }, 300);
    }

    if (incoming === outgoing) return; 

    // Update Buttons
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    // --- ANIMATION SEQUENCE ---
    
    // Step A: Fade Out Old Tab
    outgoing.style.opacity = '0';
    outgoing.style.transform = 'translateY(20px)';

    // Step B: Swap and Fade In New Tab
    setTimeout(() => {
        outgoing.classList.remove('active');
        outgoing.style.display = 'none';

        // Prepare Incoming
        incoming.style.display = 'flex';
        incoming.style.flexDirection = 'column';
        
        // *** CRITICAL FIX: RESET OPACITY ***
        // We force opacity back to 0 temporarily so we can fade it up to 1
        incoming.style.opacity = '0'; 
        incoming.style.transform = 'translateY(20px)';

        // Trigger the Fade In
        setTimeout(() => {
            incoming.classList.add('active');
            incoming.style.opacity = '1'; // Force it visible
            incoming.style.transform = 'translateY(0)';
        }, 50);

    }, 300); // Matches CSS transition time
}
// --- 3. MODAL LOGIC (THIS IS WHERE THE GIF GOES) ---
// --- 3. MODAL LOGIC (UPDATED WITH EXPANDABLE TEXT) ---
function openModal(p) {
    // A. Generate the list of accordion items from the data
    // This maps through the unique 'points' array for each project
    const pointsHTML = p.points.map(point => `
        <div class="accordion-item" onclick="toggleAccordion(this)">
            <div class="accordion-header">
                <div class="accordion-icon">${point.icon}</div>
                <div class="accordion-title">
                    <h4>${point.title}</h4>
                    <p>${point.subtitle}</p>
                </div>
                <div style="margin-left:auto; color:#666;">▼</div>
            </div>
            <div class="accordion-body">
                <p>${point.text}</p>
            </div>
        </div>
    `).join('');

    // B. Inject into the modal
    scrollContent.innerHTML = `
        <div style="margin-bottom:60px; opacity:0; animation: cardFadeIn 0.5s forwards;">
            <div style="color:#3b82f6; font-weight:bold; margin-bottom:10px;">${p.tier}</div>
            <h1 style="font-size:3rem; margin-bottom:20px; line-height:1.1;">${p.title}</h1>
            <p style="color:#999; font-size:1.2rem; line-height:1.6;">${p.desc}</p>
        </div>
        
        <div style="height:300px; overflow:hidden; border-radius:12px; margin-bottom:40px; border:1px solid rgba(255,255,255,0.1);">
            <img src="${p.image}" style="width:100%; height:100%; object-fit:cover; object-position:top;" />
        </div>
        
        <div class="section-block visible">
             <h2 style="margin-bottom: 20px;">Features & Compliance</h2>
             ${pointsHTML}
        </div>
        
        <div style="height:100px"></div>
    `;
    
    videoBox.innerHTML = `
        <div style="width:100%; height:100%; position:relative; overflow:hidden; border-radius:12px;">
             <div style="position:absolute; top:0; left:0; right:0; height:30px; background:rgba(0,0,0,0.8); border-bottom:1px solid #333; display:flex; align-items:center; padding-left:10px; gap:6px; z-index:10;">
                <div class="dot red" style="width:8px; height:8px;"></div>
                <div class="dot yellow" style="width:8px; height:8px;"></div>
                <div class="dot green" style="width:8px; height:8px;"></div>
             </div>
             <img src="${p.demoGif}" style="width:100%; height:100%; object-fit:cover; padding-top:30px;" />
        </div>
    `;
    
    overlay.classList.add('active');
}

function toggleAccordion(element) {
    element.classList.toggle('active');
}
// --- 4. ACCORDION CLICK HANDLER (NEW) ---
function toggleAccordion(element) {
    // Toggle the 'active' class on the clicked item
    element.classList.toggle('active');
}

function closeModal() { overlay.classList.remove('active'); }
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });