// Data Storage
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let adminWhatsapp = localStorage.getItem('adminWhatsapp') || '';
let isAdminLoggedIn = false;
let cart = {};
let currentProductPhoto = null; // Menyimpan foto produk yang dipilih

const ADMIN_PASSWORD = 'admin123'; // Ganti dengan password yang lebih aman

// Event Listeners
document.getElementById('customerMode').addEventListener('click', showCustomerMode);
document.getElementById('adminMode').addEventListener('click', showAdminMode);

// File upload event listener
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('productPhoto');
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
});

// Initialize
function init() {
    displayCustomerMode();
}

// === FILE UPLOAD HANDLER ===
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        clearPhotoPreview();
        return;
    }
    
    // Validasi file
    if (!file.type.startsWith('image/')) {
        alert('❌ File harus berupa gambar!');
        event.target.value = '';
        return;
    }
    
    // Batas ukuran file 5MB
    if (file.size > 5 * 1024 * 1024) {
        alert('❌ Ukuran file terlalu besar! Maksimal 5MB');
        event.target.value = '';
        return;
    }
    
    // Convert ke Base64
    const reader = new FileReader();
    reader.onload = function(e) {
        currentProductPhoto = e.target.result; // Menyimpan base64 string
        displayPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function displayPhotoPreview(imageSrc) {
    const previewDiv = document.getElementById('photoPreview');
    const previewImg = document.getElementById('previewImage');
    
    previewImg.src = imageSrc;
    previewDiv.classList.remove('hidden');
}

function clearPhotoPreview() {
    currentProductPhoto = null;
    document.getElementById('productPhoto').value = '';
    document.getElementById('photoPreview').classList.add('hidden');
    document.getElementById('previewImage').src = '';
}

// === MODE MANAGEMENT ===
function showCustomerMode() {
    document.getElementById('customerMode').classList.add('active');
    document.getElementById('adminMode').classList.remove('active');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('customerView').classList.remove('hidden');
    displayProducts();
}

function showAdminMode() {
    document.getElementById('customerMode').classList.remove('active');
    document.getElementById('adminMode').classList.add('active');
    
    if (isAdminLoggedIn) {
        showAdminDashboard();
    } else {
        document.getElementById('adminPanel').classList.remove('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('customerView').classList.add('hidden');
    }
}

function displayCustomerMode() {
    showCustomerMode();
}

// === ADMIN AUTHENTICATION ===
function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    const errorMsg = document.getElementById('adminError');
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('adminPassword').value = '';
        errorMsg.textContent = '';
        showAdminDashboard();
    } else {
        errorMsg.textContent = '❌ Password salah!';
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById('adminPanel').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    showCustomerMode();
}

function showAdminDashboard() {
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    document.getElementById('customerView').classList.add('hidden');
    displayAdminProducts();
    displayOrders();
    displayAdminWhatsappNumber();
}

// === PRODUCT MANAGEMENT (ADMIN) ===
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const unit = document.getElementById('priceUnit').value;
    const stock = parseInt(document.getElementById('productStock').value);
    
    if (!name || !currentProductPhoto || !price || !unit || !stock) {
        alert('❌ Semua field harus diisi! Pastikan foto sudah dipilih.');
        return;
    }
    
    const product = {
        id: Date.now(),
        name,
        photo: currentProductPhoto, // Menyimpan base64 string
        price,
        unit,
        stock
    };
    
    products.push(product);
    saveData();
    
    // Clear form
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('priceUnit').value = '';
    document.getElementById('productStock').value = '';
    clearPhotoPreview();
    currentProductPhoto = null;
    
    displayAdminProducts();
    alert('✅ Produk berhasil ditambahkan!');
}

function displayAdminProducts() {
    const container = document.getElementById('adminProductList');
    
    if (products.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center;">Belum ada produk. Tambahkan produk baru terlebih dahulu.</p>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-item-admin">
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>💰 Harga: Rp ${product.price.toLocaleString()} / ${product.unit}</p>
                <p>📦 Stock: ${product.stock} ${product.unit}</p>
                <img src="${product.photo}" alt="${product.name}" style="width: 100%; max-width: 200px; margin-top: 10px; border-radius: 5px;">
            </div>
            <div class="product-actions">
                <button class="btn-edit" onclick="editProduct(${product.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">🗑️ Hapus</button>
            </div>
        </div>
    `).join('');
}

function deleteProduct(id) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        products = products.filter(p => p.id !== id);
        saveData();
        displayAdminProducts();
        alert('✅ Produk berhasil dihapus!');
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('priceUnit').value = product.unit;
        document.getElementById('productStock').value = product.stock;
        
        // Tampilkan preview foto
        currentProductPhoto = product.photo;
        displayPhotoPreview(product.photo);
        
        // Hapus produk lama dan tunggu input baru
        products = products.filter(p => p.id !== id);
        saveData();
        alert('Edit mode: Ubah data dan klik "Tambah Produk" untuk menyimpan perubahan.');
    }
}

// === CUSTOMER PRODUCTS DISPLAY ===
function displayProducts() {
    const container = document.getElementById('productsList');
    
    if (products.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px 20px;">📦 Belum ada produk tersedia</p>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.photo}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-body">
                <h3>${product.name}</h3>
                <div class="product-price">Rp ${product.price.toLocaleString()}</div>
                <div class="product-stock ${product.stock < 5 ? 'low' : ''}">
                    ${product.stock > 0 ? `📦 Stock: ${product.stock} ${product.unit}` : '❌ Stok Habis'}
                </div>
                <div class="quantity-selector">
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="${product.stock}">
                    <button onclick="addToCart(${product.id})">Pesan</button>
                </div>
            </div>
        </div>
    `).join('');
}

// === CART MANAGEMENT ===
function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('❌ Produk tidak ditemukan!');
        return;
    }
    
    if (quantity <= 0 || quantity > product.stock) {
        alert('❌ Jumlah pesanan tidak valid!');
        return;
    }
    
    if (!cart[productId]) {
        cart[productId] = {
            ...product,
            quantity: 0
        };
    }
    
    cart[productId].quantity += quantity;
    
    // Reset input
    document.getElementById(`qty-${productId}`).value = 1;
    
    updateCartDisplay();
    alert(`✅ ${product.name} ditambahkan ke pesanan!`);
}

function updateCartDisplay() {
    const cartItems = Object.values(cart);
    
    if (cartItems.length === 0) {
        document.getElementById('cartSummary').classList.add('hidden');
        return;
    }
    
    document.getElementById('cartSummary').classList.remove('hidden');
    
    let totalPrice = 0;
    let cartHTML = '';
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.quantity} x Rp ${item.price.toLocaleString()} = Rp ${itemTotal.toLocaleString()}
                </div>
                <button onclick="removeFromCart(${item.id})" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer;">❌</button>
            </div>
        `;
    });
    
    document.getElementById('cartItems').innerHTML = cartHTML;
    document.getElementById('totalPrice').textContent = totalPrice.toLocaleString();
}

function removeFromCart(productId) {
    delete cart[productId];
    updateCartDisplay();
    alert('✅ Item dihapus dari pesanan');
}

// === ORDER FORM ===
function openOrderForm() {
    const cartItems = Object.values(cart);
    
    if (cartItems.length === 0) {
        alert('❌ Keranjang kosong!');
        return;
    }
    
    let orderSummary = '';
    let totalPrice = 0;
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        orderSummary += `
            <div class="order-summary-item">
                <span>${item.name} (${item.quantity}x)</span>
                <strong>Rp ${itemTotal.toLocaleString()}</strong>
            </div>
        `;
    });
    
    orderSummary += `
        <div class="order-summary-item" style="border-top: 2px solid #667eea; padding-top: 10px; margin-top: 10px; font-size: 1.1em;">
            <span>TOTAL</span>
            <strong style="color: #667eea;">Rp ${totalPrice.toLocaleString()}</strong>
        </div>
    `;
    
    document.getElementById('orderSummary').innerHTML = orderSummary;
    document.getElementById('orderModal').classList.remove('hidden');
}

function closeOrderForm() {
    document.getElementById('orderModal').classList.add('hidden');
}

function sendToWhatsapp() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    
    if (!name || !phone || !address) {
        alert('❌ Semua data harus diisi!');
        return;
    }
    
    const cartItems = Object.values(cart);
    let message = `*PESANAN BARU*\n\n`;
    message += `📝 Nama: ${name}\n`;
    message += `📞 Telepon: ${phone}\n`;
    message += `📍 Alamat: ${address}\n\n`;
    message += `*Detail Pesanan:*\n`;
    
    let totalPrice = 0;
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        message += `• ${item.name}: ${item.quantity} ${item.unit} = Rp ${itemTotal.toLocaleString()}\n`;
    });
    
    message += `\n💰 *Total: Rp ${totalPrice.toLocaleString()}*`;
    
    // Save order
    const order = {
        id: Date.now(),
        name,
        phone,
        address,
        items: cartItems,
        total: totalPrice,
        date: new Date().toLocaleString('id-ID')
    };
    
    orders.push(order);
    saveData();
    
    // Send to WhatsApp
    if (adminWhatsapp) {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${adminWhatsapp}?text=${encodedMessage}`, '_blank');
        
        // Clear cart
        cart = {};
        updateCartDisplay();
        closeOrderForm();
        
        // Clear form
        document.getElementById('customerName').value = '';
        document.getElementById('customerPhone').value = '';
        document.getElementById('customerAddress').value = '';
        
        alert('✅ Pesanan Anda sudah dikirim ke WhatsApp admin!');
    } else {
        alert('❌ Nomor WhatsApp admin belum diatur!');
    }
}

// === ORDERS DISPLAY (ADMIN) ===
function displayOrders() {
    const container = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center;">Belum ada pesanan</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="order-item">
            <h4>👤 ${order.name}</h4>
            <p>📞 ${order.phone}</p>
            <p>📍 ${order.address}</p>
            <p>💰 Total: Rp ${order.total.toLocaleString()}</p>
            <p>📅 ${order.date}</p>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                <strong>Barang:</strong>
                ${order.items.map(item => `<br>• ${item.name}: ${item.quantity} ${item.unit}`).join('')}
            </div>
        </div>
    `).reverse().join('');
}

// === WHATSAPP ADMIN SETUP ===
function saveAdminWhatsapp() {
    const whatsapp = document.getElementById('adminWhatsapp').value;
    
    if (!whatsapp) {
        alert('❌ Nomor WhatsApp tidak boleh kosong!');
        return;
    }
    
    if (!/^\d{10,}$/.test(whatsapp)) {
        alert('❌ Format nomor WhatsApp tidak valid! (contoh: 6281234567890)');
        return;
    }
    
    adminWhatsapp = whatsapp;
    localStorage.setItem('adminWhatsapp', whatsapp);
    
    const status = document.getElementById('whatsappStatus');
    status.textContent = '✅ Nomor WhatsApp berhasil disimpan!';
    setTimeout(() => {
        status.textContent = '';
    }, 3000);
}

function displayAdminWhatsappNumber() {
    document.getElementById('adminWhatsapp').value = adminWhatsapp;
}

// === SHARE LINK ===
function generateShareLink() {
    const baseUrl = window.location.href.split('?')[0].split('#')[0];
    const shareUrl = `${baseUrl}?mode=customer`;
    
    document.getElementById('shareLinkInput').value = shareUrl;
    document.getElementById('shareLinkModal').classList.remove('hidden');
}

function closeShareLink() {
    document.getElementById('shareLinkModal').classList.add('hidden');
}

function copyToClipboard() {
    const input = document.getElementById('shareLinkInput');
    input.select();
    document.execCommand('copy');
    alert('✅ Link berhasil dicopy!');
}

// === DATA PERSISTENCE ===
function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('orders', JSON.stringify(orders));
}

// === MODAL CLOSE ON OUTSIDE CLICK ===
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const shareLinkModal = document.getElementById('shareLinkModal');
    
    if (event.target === orderModal) {
        closeOrderForm();
    }
    if (event.target === shareLinkModal) {
        closeShareLink();
    }
}

// Initialize app
init();
