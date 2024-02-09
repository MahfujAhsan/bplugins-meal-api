
const { MongoServerError } = require('mongodb');
const Deposit = require('../models/depositModel');
const User = require('../models/userModel');

module.exports.createDepositByManager = async (req, res, next) => {
    try {
        const depositData = req.body

        // const users = await User.find();

        const existingDeposit = await Deposit.findOne({ walletID: depositData?.walletID, email: depositData?.email })

        // const usersBPluginsID = users?.map((user) => user?.bPluginsID);

        // console.log(usersBPluginsID)

        if (existingDeposit) {
            // const sumOfAmount = existingDeposit?.amount + Number(depositData?.amount)
            // const updatedDeposit = await Deposit.findByIdAndUpdate(existingDeposit?._id, { amount: sumOfAmount }, { new: true });
            // res.status(200).json({
            //     success: true,
            //     data: updatedDeposit,
            //     message: 'Deposit updated successfully!'
            // })
            return res.status(409).json({
                success: false,
                message: 'Deposit is already exists!'
            })
        }
        else {
            const deposit = await Deposit.create(depositData)

            res.status(201).json({
                success: true,
                data: deposit,
                message: 'Deposit created successfully!`'
            })
        }
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            // Handle duplicate key error
            res.status(409).json({ error: true, message: 'Wallet already exists!' });
        } else {
            // Handle other errors
            res.status(500).json({ error: true, message: 'Internal server error' });
        }
        next(error);
    }
}

module.exports.getAllUsersDepositInfo = async (req, res, next) => {
    try {
        const result = await Deposit.find();
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal server error' });
        next(error);
    }
}

module.exports.getDepositInfoByUser = async (req, res, next) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(200).json([]);
        }

        const decodedEmail = req.decoded.email;

        if (email !== decodedEmail) {
            return res.status(403).json({ error: true, message: 'Forbidden access' });
        }

        const wallet = await Deposit.findOne({ email: decodedEmail });

        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal server error' });
        next(error);
    }
}

module.exports.getDepositById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const walletInfo = await Deposit.findOne({_id: id});

        if (!walletInfo) {
            return res.status(404).json({ success: false, message: 'Wallet not found' });
        }

        res.status(200).json({ success: true, data: walletInfo });
    } catch (error) {
        next(error)
    }
};

module.exports.editDepositById = async (req, res, next) => {
    try {
        const walletId = req.params.id;
        const updateData = req.body;

        const updatedWallet = await Deposit.findByIdAndUpdate(
            walletId,
            updateData,
            { new: true }
        );

        if (!updatedWallet) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Wallet updated successfully!',
            data: updatedWallet
        });
    } catch (error) {
        next(error);
    }
};

module.exports.deleteWallet = async (req, res, next) => {
    try {

    } catch (error) {

    }
}