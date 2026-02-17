import { models } from "../db/db.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
    try {
        const users = await models.users.findAll({
            attributes: { exclude: ['password'] }
        });

        // Map backend fields to frontend expected fields
        const formattedUsers = users.map(user => ({
            id: user.user_id,
            name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
            email: user.email,
            contactNumber: '', // Base model doesn't have phone, keeping for compatibility
            address: user.address,
            status: user.isActive,
            role: user.account_type
        }));

        res.json(formattedUsers);
    } catch (error) {
        console.error("Get Users Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, address, status, account_type } = req.body;

        const user = await models.users.findByPk(id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Split name back into first and last if provided
        let first_name = user.first_name;
        let last_name = user.last_name;
        if (name) {
            const names = name.split(' ');
            first_name = names[0];
            last_name = names.slice(1).join(' ') || '';
        }

        await user.update({
            first_name,
            last_name,
            email: email || user.email,
            address: address !== undefined ? address : user.address,
            isActive: status !== undefined ? status : user.isActive,
            account_type: account_type || user.account_type
        });

        res.json({ msg: "User updated successfully" });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await models.users.findByPk(id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        await user.destroy();
        res.json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
