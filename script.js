// ==========================================
// ১. প্রডাক্ট ভেরিয়েন্ট ডাটা (কালার অনুযায়ী ইমেজ ও টাইটেল)
// ==========================================
const productVariants = {
    white: {
        title: 'ডিজাইন এ: "জুলাই উল্লাস" (সাদা)',
        image: 'img/product_image/24_bijoy_ullas/polo_t-shart/white.jpeg',
        colorName: 'সাদা',
        designValue: "ডিজাইন এ: 'বিকল্প কে আছে?'"
    },
    green: {
        title: 'ডিজাইন বি: "স্বাধীনতা ২৪" (সবুজ)',
        image: 'img/product_image/24_bijoy_ullas/polo_t-shart/green.jpeg',
        colorName: 'সবুজ',
        designValue: "ডিজাইন বি: 'স্বাধীনতা ২৪'"
    },
    black: {
        title: 'ডিজাইন সি: "বুকের ভেতর দারুণ ঝড়" (কালো)',
        image: 'img/product_image/24_bijoy_ullas/polo_t-shart/black.jpeg',
        colorName: 'কালো',
        designValue: "ডিজাইন সি: 'বুকের ভেতর দারুণ ঝড়'"
    }
};

// ==========================================
// ২. লাইভ ইনভয়েস ক্যালকুলেটর (সঠিক গাণিতিক হিসাবসহ আপডেটেড)
// ==========================================
function initLiveInvoice() {
    const qtySelect = document.getElementById('quantity');
    const areaDhaka = document.getElementById('area-dhaka');
    const areaOutside = document.getElementById('area-outside');
    const payCod = document.getElementById('pay-cod');
    const payAdvance = document.getElementById('pay-advance');
    const bkashWrapper = document.getElementById('bkash-payment-wrapper');
    const bkashChargeAmount = document.getElementById('bkash-charge-amount');
    const trxField = document.getElementById('trxid');

    if (!qtySelect) return;

    const pricePerPiece = 390;

    function calculateBill() {
        const qty = parseInt(qtySelect.value) || 1;
        let subtotal = qty * pricePerPiece;
        let comboDiscount = 0;
        let advanceDiscount = 0;

        // ১. ৩ পিস কম্বো অফার চেক (১৪.৬২৫%)
        if (qty >= 3) {
            comboDiscount = Math.round(subtotal * 0.14625);
            document.getElementById('invoice-discount-wrapper').style.display = 'flex';
        } else {
            document.getElementById('invoice-discount-wrapper').style.display = 'none';
        }

        // ২. এরিয়া ভিত্তিক ডেলিভারি চার্জ নির্ধারণ
        let deliveryCharge = areaOutside && areaOutside.checked ? 120 : 70;
        if (bkashChargeAmount) bkashChargeAmount.innerText = deliveryCharge;

        // ৩. অগ্রিম পেমেন্ট ৫% ডিসকাউন্ট লজিক ও বিকাশ ইন্টারফেস টগল
        let currentTotalBeforeAdvance = (subtotal + deliveryCharge) - comboDiscount;

        if (payAdvance && payAdvance.checked) {
            advanceDiscount = Math.round(currentTotalBeforeAdvance * 0.05);
            if (bkashWrapper) bkashWrapper.style.display = 'block';
            if (trxField) trxField.required = true; // ট্রানজেকশন আইডি বাধ্যতামূলক করা হলো
            document.getElementById('invoice-advance-discount-wrapper').style.display = 'flex';
        } else {
            if (bkashWrapper) bkashWrapper.style.display = 'none';
            if (trxField) {
                trxField.required = false;
                trxField.value = ""; // ফিল্ড রিসেট করা
            }
            document.getElementById('invoice-advance-discount-wrapper').style.display = 'none';
        }

        // ফাইনাল ক্যালকুলেশন
        let finalTotal = currentTotalBeforeAdvance - advanceDiscount;

        // UI আপডেট
        document.getElementById('invoice-subtotal').innerText = subtotal;
        document.getElementById('invoice-shipping').innerText = deliveryCharge;
        document.getElementById('invoice-discount').innerText = comboDiscount;
        document.getElementById('invoice-advance-discount').innerText = advanceDiscount;
        document.getElementById('invoice-total').innerText = finalTotal;
    }

    // সব ধরণের ইভেন্ট লিসেনার একসাথে যুক্ত করা
    qtySelect.addEventListener('change', calculateBill);
    if (areaDhaka) areaDhaka.addEventListener('change', calculateBill);
    if (areaOutside) areaOutside.addEventListener('change', calculateBill);
    if (payCod) payCod.addEventListener('change', calculateBill);
    if (payAdvance) payAdvance.addEventListener('change', calculateBill);

    calculateBill(); // ইনিশিয়াল রান
}

// ==========================================
// ৩. কালার পরিবর্তনের লজিক
// ==========================================
function setupColorSwitcher() {
    const colorDots = document.querySelectorAll('.variant-dot');
    const productImg = document.getElementById('main-product-img');
    const productTitle = document.getElementById('main-product-title');
    const colorSelect = document.getElementById('color');
    const designSelect = document.getElementById('design');

    if (!colorDots.length) return;

    colorDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const activeDot = document.querySelector('.variant-dot.active');
            if (activeDot) activeDot.classList.remove('active');
            this.classList.add('active');

            const selectedColor = this.getAttribute('data-color');
            const variant = productVariants[selectedColor];

            if (variant) {
                if (productImg) {
                    productImg.src = variant.image;
                    productImg.alt = variant.title;
                }
                if (productTitle) productTitle.textContent = variant.title;
                if (colorSelect) colorSelect.value = variant.colorName;
                if (designSelect) designSelect.value = variant.designValue;
            }
        });
    });
}

// ==========================================
// ৪. হোয়াটসঅ্যাপ ফ্লোটিং বাতন হ্যান্ডলার
// ==========================================
function initWhatsAppFloating() {
    var num = "8801880884197";
    var msg = "আসসালামু আলাইকুম। আমি আপনাদের 'জুলাই টি-শার্ট কালেকশন' টি দেখেছি। এ বিষয়ে বিস্তারিত জানতে চাই।";
    var fullUrl = "https://api.whatsapp.com/send?phone=" + num + "&text=" + encodeURIComponent(msg);
    var waBtn = document.getElementById("whatsapp-customer-care");
    if (waBtn) waBtn.href = fullUrl;
}

// ==========================================
// ৫. ফর্ম সাবমিশন ও হোয়াটসঅ্যাপে ইনভয়েস পাঠানো
// ==========================================
function initOrderForm() {
    const orderForm = document.getElementById('ts-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const quantity = document.getElementById('quantity').value;
            const size = document.getElementById('size').value;

            const colorSelect = document.getElementById('color');
            const designSelect = document.getElementById('design');
            const color = colorSelect ? colorSelect.value : "সাদা";
            const design = designSelect ? designSelect.value : "ডিজাইন এ: 'বিকল্প কে আছে?'";

            // ডাইনামিক লাইভ ইনভয়েস ডাটা রিড করা
            const finalSubtotal = document.getElementById('invoice-subtotal').innerText;
            const finalShipping = document.getElementById('invoice-shipping').innerText;
            const finalComboDiscount = document.getElementById('invoice-discount').innerText;
            const finalAdvanceDiscount = document.getElementById('invoice-advance-discount').innerText;
            const finalTotal = document.getElementById('invoice-total').innerText;

            // মেথড ও ট্রানজেকশন ডেটা
            const isAdvance = document.getElementById('pay-advance').checked;
            const paymentMethodText = isAdvance ? "⚡ ডেলিভারি চার্জ এডভান্স (বিকাশ)" : "💵 ফুল ক্যাশ অন ডেলিভারি (COD)";
            const trxIdValue = document.getElementById('trxid').value.trim();

            const whatsappNumber = "8801880884197";

            // প্রফেশনাল মেসেজ টেমপ্লেট জেনারেটর
            let message = `*নতুন টি-শার্ট অর্ডার বিবরণী (জুলাই কালেকশন)*\n` +
                `----------------------------------\n\n` +
                `👤 *গ্রাহকের নাম:* ${name}\n` +
                `📞 *মোবাইল নম্বর:* ${phone}\n` +
                `📍 *ডেলিভারি ঠিকানা:* ${address}\n\n` +
                `🛒 *পণ্যের বিবরণ:*\n` +
                `• ডিজাইন: ${design}\n` +
                `• কালার/রঙ: ${color}\n` +
                `• সাইজ: ${size}\n` +
                `• পরিমাণ: ${quantity} পিস\n\n` +
                `💳 *পেমেন্ট ও বিলিং সামারি:*\n` +
                `• সাবটোটাল: ৳ ${finalSubtotal}\n` +
                `• ডেলিভারি চার্জ: ৳ ${finalShipping}\n`;

            if (parseInt(finalComboDiscount) > 0) {
                message += `• কম্বো অফার ডিসকাউন্ট: - ৳ ${finalComboDiscount}\n`;
            }
            if (parseInt(finalAdvanceDiscount) > 0) {
                message += `• এডভান্স পেমেন্ট ডিসকাউন্ট (৫%): - ৳ ${finalAdvanceDiscount}\n`;
            }

            message += `• *সর্বমোট প্রদেয় বিল: ৳ ${finalTotal}*\n\n` +
                `⚙️ *পেমেন্ট মেথড:* ${paymentMethodText}\n`;

            if (isAdvance && trxIdValue !== "") {
                message += `🆔 *বিকাশ TrxID:* ${trxIdValue}\n`;
            }

            message += `\n----------------------------------\n` +
                `_অর্ডারটি দ্রুত ভেরিফাই করে কনফার্ম করুন। ধন্যবাদ!_`;

            window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`, '_blank');
        });
    }
}

// ==========================================
// ৬. ব্যাকগ্রাউন্ড মিউজিক কন্ট্রোল
// ==========================================
function initBackgroundMusic() {
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');

    if (bgMusic && musicToggle) {
        const musicIcon = musicToggle.querySelector('.music-icon');
        bgMusic.volume = 1;
        bgMusic.muted = true;
        bgMusic.play().catch(err => console.log("Autoplay waiting for interaction"));

        function activateSound() {
            if (bgMusic.muted) {
                bgMusic.muted = false;
                musicToggle.classList.add('music-playing');
                if (musicIcon) musicIcon.textContent = '🔊';
                window.removeEventListener('scroll', activateSound);
                document.removeEventListener('mousemove', activateSound);
                document.removeEventListener('touchstart', activateSound);
            }
        }

        window.addEventListener('scroll', activateSound, { passive: true });
        document.addEventListener('mousemove', activateSound, { passive: true });
        document.addEventListener('touchstart', activateSound, { passive: true });

        musicToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (bgMusic.muted || bgMusic.paused) {
                bgMusic.muted = false;
                bgMusic.play();
                musicToggle.classList.add('music-playing');
                if (musicIcon) musicIcon.textContent = '🔊';
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('music-playing');
                if (musicIcon) musicIcon.textContent = '🔇';
            }
        });
    }
}

// ==========================================
// ৭. হিরো স্লাইডার লজিক
// ==========================================
function initHeroSlider() {
    const slidesData = [
        // গ্রিন ডমিন্যান্ট ওভারলে (সবুজ এবং কালোর ব্লেন্ড)
        { img: "img/hero_banner/hero_banner_1.webp", overlay: "linear-gradient(rgba(22, 163, 74, 0.45), rgba(17, 24, 39, 0.85))" },

        // রেড ডমিন্যান্ট ওভারলে (লাল এবং কালোর ব্লেন্ড)
        { img: "img/hero_banner/hero_banner_2.jpg", overlay: "linear-gradient(rgba(220, 38, 38, 0.45), rgba(17, 24, 39, 0.85))" },

        // লাল ও সবুজের সরাসরি মিক্সড ক্রসব্লেন্ড (বিপ্লবের আবহ)
        { img: "img/hero_banner/hero_banner_3.webp", overlay: "linear-gradient(rgba(22, 163, 74, 0.5), rgba(185, 28, 28, 0.6))" },

        // ডিপ ফরেস্ট গ্রিন ওভারলে
        { img: "img/hero_banner/hero_banner_4.jpg", overlay: "linear-gradient(rgba(21, 128, 61, 0.4), rgba(11, 15, 26, 0.9))" },

        // ব্লাড রেড ওভারলে
        { img: "img/hero_banner/hero_banner_5.webp", overlay: "linear-gradient(rgba(185, 28, 28, 0.45), rgba(11, 15, 26, 0.9))" },

        // লাইট গ্রিন ভাইব
        { img: "img/hero_banner/hero_banner_6.jpg", overlay: "linear-gradient(rgba(22, 163, 74, 0.35), rgba(17, 24, 39, 0.85))" },

        // ভাইব্রেন্ট রেড ভাইব
        { img: "img/hero_banner/hero_banner_7.jpg", overlay: "linear-gradient(rgba(220, 38, 38, 0.35), rgba(17, 24, 39, 0.85))" },

        // লাল-সবুজের আলতো ক্রসব্লেন্ড (ডার্ক বেস)
        { img: "img/hero_banner/hero_banner_8.jpg", overlay: "linear-gradient(rgba(21, 128, 61, 0.4), rgba(153, 27, 27, 0.5), rgba(11, 15, 26, 0.85))" },

        // ডিপ গ্রিন
        { img: "img/hero_banner/hero_banner_9.avif", overlay: "linear-gradient(rgba(22, 163, 74, 0.4), rgba(17, 24, 39, 0.85))" },

        // ডিপ রেড
        { img: "img/hero_banner/hero_banner_10.webp", overlay: "linear-gradient(rgba(220, 38, 38, 0.4), rgba(17, 24, 39, 0.85))" }
    ];

    const slide1 = document.getElementById("slide-1");
    const slide2 = document.getElementById("slide-2");

    if (!slide1 || !slide2) return;

    let currentIndex = 0;
    let isSlide1Active = true;
    const displayDuration = 5000;

    function setSlideStyle(slideElement, index) {
        slideElement.style.backgroundImage = `${slidesData[index].overlay}, url('${slidesData[index].img}')`;
    }

    setSlideStyle(slide1, currentIndex);

    setInterval(function () {
        let nextIndex = (currentIndex + 1) % slidesData.length;

        if (isSlide1Active) {
            setSlideStyle(slide2, nextIndex);
            slide2.classList.add("active-slide");
            slide1.classList.remove("active-slide");
        } else {
            setSlideStyle(slide1, nextIndex);
            slide1.classList.add("active-slide");
            slide2.classList.remove("active-slide");
        }

        currentIndex = nextIndex;
        isSlide1Active = !isSlide1Active;
    }, displayDuration);
}

// ==========================================
// ৮. DOMContentLoaded ইভেন্টে সব ফাংশন চালু করা
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    initLiveInvoice();
    setupColorSwitcher();
    initWhatsAppFloating();
    initOrderForm();
    initBackgroundMusic();
    initHeroSlider();
});