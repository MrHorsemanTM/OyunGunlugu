🎮 Oyun Günlüğü ve Koleksiyon Yönetim Sistemi. Bu proje, Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiş, oyun koleksiyonlarını dijital ortamda saklamayı, puanlamayı ve yönetmeyi sağlayan tam yığın (full-stack) bir web uygulamasıdır.

🚀 Öne Çıkan Özellikler
Tam CRUD Desteği: Oyun ekleme, listeleme, detay görüntüleme ve silme.

Rozet Sistemi: Oyun puanlarına göre (0-5) otomatik atanan görsel rozetler (Bakır, Gümüş, Altın vb.).

Interaktif Dokümantasyon: Swagger UI ile tüm API uç noktalarının canlı testi.

Unit Test: İş mantığı ve rozet hesaplamaları için hazırlanan otomatik testler.

🛠 Kullanılan Teknolojiler
Backend: Node.js, Express.js

Frontend: Vanilla JavaScript, HTML5, CSS3 (SPA Mimarisi)

Veritabanı: MySQL (Sequelize ORM ile)

API Dokümantasyonu: Swagger (OpenAPI 3.0)

Test: Jest

📂 Proje Yapısı (Modüler Mimari)
Proje, PDF gereksinimlerine uygun olarak katmanlı mimari ile geliştirilmiştir:

src/public/: Frontend arayüz dosyaları (HTML, CSS, script.js).

src/routes/: API yönlendirmeleri ve Swagger tanımları.

src/controllers/: İstek yönetimi ve yanıt kontrolü.

src/services/: İş mantığı ve veritabanı sorgu yönetimi.

src/models/: Veritabanı tablo şemaları (Sequelize modelleri).

src/config/: Veritabanı bağlantı ayarları.

tests/: Birim (Unit) test dosyaları.

⚙️ Kurulum ve Çalıştırma
1. Ön Hazırlık
Bilgisayarınızda Node.js ve MySQL kurulu olmalıdır.

MySQL üzerinde şu komutla veritabanını oluşturun:
CREATE DATABASE oyun_gunlugu;

2. Bağımlılıkların Yüklenmesi
Proje ana dizininde terminali açın ve gerekli paketleri yükleyin:
npm install

3. Yapılandırma (.env)
Ana dizinde bir .env dosyası oluşturun ve kendi bilgilerinizi girin:
DB_HOST=localhost
DB_USER=root
DB_PASS=sifreniz
DB_NAME=oyun_gunlugu
PORT=3000

4. Uygulamayı Başlatma
node app.js

Sunucu çalıştıktan sonra tarayıcıdan http://localhost:3000/login.html adresine giderek uygulamayı kullanabilirsiniz.

🧪 Testlerin Çalıştırılması
İş mantığının doğruluğunu teyit etmek için hazırlanan unit testleri şu komutla çalıştırabilirsiniz:
npm test

📖 API Dokümantasyonu (Swagger)
Proje çalışırken tüm API endpoint'lerini test etmek ve detaylarını görmek için Swagger arayüzüne erişebilirsiniz:
👉 http://localhost:3000/api-docs

📦 Teslim Notları
node_modules klasörü boyut nedeniyle ZIP dosyasına dahil edilmemiştir; lütfen npm install ile yükleyiniz.

Veritabanı tabloları uygulama ilk kez çalıştırıldığında Sequelize tarafından otomatik olarak (alter: true) oluşturulacaktır.
