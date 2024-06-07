const routes = express.Router();
const productRouter = require('./productRouter.js');
const cartRouter = require('./cartRouter.js');
const authRouter = require('./authRouter.js');
const paymentRouter = require('./paymentRouter.js');

routes.use('/productData', productRouter);
routes.use('/auth', authRouter);
routes.use('/payment', paymentRouter);
routes.use('/cart', cartRouter);

module.exports = routes;