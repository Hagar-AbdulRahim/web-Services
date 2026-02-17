import jwt from 'jsonwebtoken';

export async function generateToken(userId, email, role, res) {
    const token = jwt.sign({ userId, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    });

    return token;
}

