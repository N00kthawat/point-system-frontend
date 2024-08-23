import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the user data!", error);
            });

        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products data!", error);
            });
    }, [userId]);

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{ backgroundColor: "black", justifyContent: "space-between", height: 80 }}>
                    <Typography gutterBottom
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", color: "white", fontFamily: "Myriad Pro, sans-serif" }}
                        variant="h10" marginTop={"15px"}
                    >
                        <Link to={`/home/${userId}`} className="nav-item">Home</Link>
                        <Link to="/" className="nav-item">LOGOUT</Link>
                    </Typography>

                    <Typography gutterBottom
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", color: "white", fontFamily: "Myriad Pro, sans-serif" }}
                        variant="h4" marginTop={"15px"}
                    >
                        {user ? (<p>{user.user_fullname}</p>) : (<p>Loading user data...</p>)}
                    </Typography>

                    <Typography onClick={handleLogout}
                        gutterBottom
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", color: "white", fontFamily: "Myriad Pro, sans-serif" }}
                        variant="h4" marginTop={"15px"}
                    >
                        {user ? (<p>{user.userpoint}</p>) : (<p>Loading user data...</p>)}
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className='content'>
                <h1>รายละเอียดส่วยลดอาหาร</h1>
                {products.length > 0 ? (
                    <div className='grid-container'>
                        {products.map(product => (
                            <div key={product.id} className='product-card'>
                                <Link to={`/detail/${userId}/${product.id}`}>
                                <img src={product.img} alt={product.name} className='product-image' />
                                </Link>
                                <h2 className='product-title'>{product.name}</h2>
                                <p><strong>Points:</strong> {product.points}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading products...</p>
                )}
                <p><strong>หมายเหตุ:</strong> การสั่งซื้อออนไลน์ต้องตรวจสอบรายละเอียดโปรโมชั่นและเงื่อนไขเพิ่มเติมที่เว็บไซต์ของร้านอาหาร</p>
            </div>

        </>
    );
};

export default Home;
