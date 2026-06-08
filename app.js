const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const session = require('express-session'); // Oturum yönetimi için eklendi
const sequelize = require('./src/config/db'); // Veritabanı bağlantı yolun
const gameRoutes = require('./src/routes/gameRoutes');
const authRoutes = require('./src/routes/authRoutes'); // Kimlik doğrulama rotaları eklendi
require('dotenv').config();

// Veri İzolasyonu İçin Modelleri İçe Aktarıyoruz
const User = require('./src/models/User');
const Game = require('./src/models/Game'); 

// --- Modeller Arası İlişki Tanımı (1-to-Many) ---
User.hasMany(Game, { foreignKey: 'userId', onDelete: 'CASCADE' });
Game.belongsTo(User, { foreignKey: 'userId' });

const app = express();

// Swagger ayarlarını YAML yerine doğrudan javascript nesnesi olarak güvenli hale getirdik
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Oyun Günlüğü API',
      version: '1.0.0',
      description: 'Sistem Analizi ve Tasarımı Dersi Projesi API Dokümantasyonu',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    paths: {
      '/api/auth/register': {
        post: {
          summary: 'Yeni kullanıcı kaydı oluşturur',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                  },
                  required: ['username', 'email', 'password']
                }
              }
            }
          },
          responses: {
            201: { description: 'Kullanıcı başarıyla kaydedildi.' },
            400: { description: 'Geçersiz veri veya e-posta zaten kullanımda.' }
          }
        }
      },
      '/api/auth/login': {
        post: {
          summary: 'Kullanıcı girişi sağlar ve oturum açar',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                  },
                  required: ['email', 'password']
                }
              }
            }
          },
          responses: {
            200: { description: 'Giriş başarılı.' },
            401: { description: 'Hatalı e-posta veya şifre.' }
          }
        }
      },
      '/api/auth/logout': {
        post: {
          summary: 'Mevcut oturumu sonlandırır',
          tags: ['Auth'],
          responses: {
            200: { description: 'Başarıyla çıkış yapıldı.' }
          }
        }
      },
      '/api/games': {
        get: {
          summary: 'Tüm oyunları listeler (Giriş zorunludur)',
          tags: ['Games'],
          responses: {
            200: { description: 'Oyun listesi başarıyla döndü.' },
            401: { description: 'Yetkisiz erişim - Giriş yapılmalı.' }
          }
        },
        post: {
          summary: 'Yeni oyun ekler (Giriş zorunludur)',
          tags: ['Games'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    genre: { type: 'string' },
                    status: { 
                      type: 'string',
                      enum: ['Bırakıldı', 'Oynanılacak', 'Tamamlandı']
                    },
                    rating: { 
                      type: 'integer',
                      minimum: 0,
                      maximum: 5,
                      description: 'Rozet Puanı (0-5)'
                    },
                    summary: {
                      type: 'string',
                      description: 'Oyun özeti veya günlük notu'
                    }
                  },
                  required: ['title']
                }
              }
            }
          },
          responses: {
            201: { description: 'Oyun oluşturuldu.' },
            401: { description: 'Yetkisiz erişim - Giriş yapılmalı.' }
          }
        }
      },
      '/api/games/{id}': {
        delete: {
          summary: 'ID bazlı oyun siler (Giriş zorunludur)',
          tags: ['Games'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: { description: 'Oyun başarıyla silindi.' },
            401: { description: 'Yetkisiz erişim - Giriş yapılmalı.' }
          }
        }
      }
    }
  },
  apis: [], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Middleware Yapılandırmaları ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('src/public'));

// --- Oturum (Session) Yönetimi ---
app.use(session({
    secret: process.env.SESSION_SECRET || 'oyun_gunlugu_super_gizli_secret_anahtari',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

// --- API Rotaları (Routes) ---
app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // ⚠️ KRİTİK ADIM: Tabloları temizleyip yeni Türkçe ENUM ve Summary alanlarıyla sıfırdan kurmak için
    // alter: true yerine geçici olarak force: true yapıyoruz. Sunucu 1 kez çalıştıktan sonra bunu eski haline çekebilirsin.
    await sequelize.sync({ alter: true }); 
    console.log('------------------------------------------');
    console.log('✅ MySQL/SQLite bağlantısı başarılı!');
    
    app.listen(PORT, () => {
      console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
      console.log('------------------------------------------');
    });
  } catch (error) {
    console.error('Sunucu başlatılırken hata oluştu:', error);
  }
}

startServer();