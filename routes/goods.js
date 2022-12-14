const express = require('express');
const router = express.Router();
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart.js");


router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;
    const goods = await Goods.find({ goodsId });
    if (goods.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

    res.json({ goods: createdGoods });
});


router.post('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    console.log(typeof (goodsId));
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId });
    console.log('test here');
    // console.log(typeof (existsCarts[0]['goodsId']));
    if (existsCarts.length) {

        return res.status(400).json({
            success: false,
            errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
        })
    }

    await Cart.create({ goodsId, quantity });
    res.json({ result: "Success" });
})


router.put('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    if ((await Cart.find({ goodsId })).length) {
        await Cart.updateOne(
            { goodsId },
            { $set: { quantity } }
        );
    }

    res.status(200).json({ Success: true });
})


router.delete('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    if ((await Cart.find({ goodsId })).length) {
        await Cart.deleteOne({ goodsId });
    }

    res.status(200).json({ Success: true });
})

module.exports = router;