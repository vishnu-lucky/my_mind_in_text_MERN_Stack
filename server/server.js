const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: 'D:/project_D/my_mind_in_text_MERN_Stack/.env' }); 

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));


const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
