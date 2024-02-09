const Cost = require("../models/costModel")

module.exports.createCost = async (req, res, next) => {
    try {
        const costData = req.body;

        const cost = await Cost.create(costData)

        res.status(201).json({
            success: true,
            data: cost,
            message: "Cost created successfully"
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getCosts = async (req, res, next) => {
    try {
        const costs = await Cost.find();

        res.status(200).json({
            success: true,
            data: costs,
            message: "Costs Retrieved Successfully!"
        })
    } catch (error) {
        next(error)
    }
}

module.exports.deleteAllCostEntries = async (req, res, next) => {
    try {
        const deleteEntries = await Cost.deleteMany({});

        res.status(200).json({
            success: true,
            data: deleteEntries,
            message: "All Entries Deleted Successfully!"
        })
    }
    catch (error) {
        next(error)
    }
}