const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const sequelize = require('./src/config/db');
const gameRoutes = require('./src/routes/gameRoutes');
require('dotenv').config();

const app = express();

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
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json()); 
app.use(express.static('src/public'));

app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {

    await sequelize.sync({ alter: true }); 
    console.log('------------------------------------------');
    console.log('✅ MySQL bağlantısı başarılı!');
    console.log('✅ Veritabanı tabloları güncellendi.');
    
    app.listen(PORT, () => {
      console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
      console.log('------------------------------------------');
    });
  } catch (error) {
    console.error('Sunucu başlatılırken hata oluştu:', error);
  }
}

startServer();