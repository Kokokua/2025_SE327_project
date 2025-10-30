const db = require('../db');

class Report {
    // Create a new report entry
    static async createReport(name, email, topic, message) {
        const [result] = await db.query(
            'INSERT INTO reports (name, email, topic, message) VALUES (?, ?, ?, ?)',
            [name, email, topic, message]
        );
        return result.insertId;
    }

    // Retrieve all reports, most recent first
    static async getAllReports() {
        const [reports] = await db.query(
            'SELECT * FROM reports ORDER BY created_at DESC'
        );
        return reports;
    }

    // Delete a report by its ID
    static async deleteReport(reportId) {
        await db.query('DELETE FROM reports WHERE id = ?', [reportId]);
    }
}

module.exports = Report;