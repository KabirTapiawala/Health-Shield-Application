const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/health-shield', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/search', searchRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
