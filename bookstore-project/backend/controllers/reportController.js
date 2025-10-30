const Report = require('../models/reportModel');

const reportController = {
    // Endpoint to create a report
    createReport: async (req, res) => {
        try {
            const { username, email, topic, message } = req.body;
            const reportId = await Report.createReport(
                username,
                email,
                topic,
                message
            );

            res.status(201).json({
                success: true,
                reportId,
                message: 'Report created successfully'
            });
        } catch (error) {
            console.error('Error creating report:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating report'
            });
        }
    },

    // Endpoint to get all reports
    getAllReports: async (req, res) => {
        try {
            const reports = await Report.getAllReports();
            res.json({
                success: true,
                data: reports
            });
        } catch (error) {
            console.error('Error fetching reports:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching reports'
            });
        }
    },

    // Endpoint to delete a report
    deleteReport: async (req, res) => {
        try {
            const { reportId } = req.params;
            await Report.deleteReport(reportId);
            res.json({
                success: true,
                message: 'Report deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting report:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting report'
            });
        }
    }
};

module.exports = reportController;