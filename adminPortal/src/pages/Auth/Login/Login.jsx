import React, { useState } from 'react';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import { MdEmail, MdLock } from 'react-icons/md';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem("adminToken", "dummy-token");
            if (rememberMe) {
                localStorage.setItem("rememberEmail", formData.email);
            }
            window.location.href = "/dashboard";
            setLoading(false);
        }, 1500);
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Welcome Back
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
                Sign in to your admin account
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="admin@wishfaah.pk"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    leftIcon={<MdEmail className="w-5 h-5 text-gray-400" />}
                    fullWidth
                />

                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                    leftIcon={<MdLock className="w-5 h-5 text-gray-400" />}
                    fullWidth
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Remember me</span>
                    </label>
                    <a 
                        href="/forgot-password" 
                        className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
                    >
                        Forgot password?
                    </a>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    fullWidth
                    className="mt-6"
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a 
                        href="/register" 
                        className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline"
                    >
                        Register As Admin
                    </a>
                </p>
            </div>
        </>
    );
}

export default Login;