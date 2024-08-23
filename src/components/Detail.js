import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function Detail() {
    const { userId, id } = useParams();
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [isRedeemed, setIsRedeemed] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isRedeemDisabled, setIsRedeemDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${userId}`)
            .then(response => {
                setUser(response.data);
                setIsRedeemed(response.data.redeemedProducts?.includes(Number(id)) || false);
                setIsRedeemDisabled(response.data.userpoint < (product?.points || 0));
            })
            .catch(error => {
                console.error("There was an error fetching the user data!", error);
            });

        axios.get(`http://localhost:5000/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setIsRedeemDisabled(user?.userpoint < response.data.points || false);
            })
            .catch(error => {
                console.error("There was an error fetching the product data!", error);
            });
    }, [userId, id, user?.userpoint]);

    const handleRedeem = () => {
        setOpenDialog(true);
    };

    const confirmRedeem = () => {
        axios.post('http://localhost:5000/redeem', {
            id_user: Number(userId),
            product_id: Number(id)
        })
        .then(response => {
            console.log('Product redeemed successfully:', response.data);
            setIsRedeemed(true);
            localStorage.setItem(`redeemed-${id}`, 'true'); // Update localStorage
            setOpenDialog(false);
        })
        .catch(error => {
            console.error("There was an error redeeming the product!", error);
        });
    };

    const cancelRedeem = () => {
        setOpenDialog(false);
    };

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

            <div className='content-2'
                    style={{ marginTop:'20px' }}>
                {product ? (
                    <div className='product-card'>
                        <img src={product.img} alt={product.name} className='product-image' />
                        <div className='product-card-content'>
                            <h2 className='product-title'>{product.name}</h2>
                            <p>{product.discount}</p>
                            <div className='product-header'>
                                <button 
                                    onClick={handleRedeem} 
                                    className='redeem-button'
                                    style={{ 
                                        height: '40px', 
                                        width: '100px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        marginTop:'15px'
                                    }}
                                    disabled={isRedeemed || isRedeemDisabled}
                                >
                                    Redeem
                                </button>
                                <h2>{product.points}</h2>
                            </div>
                            <p className='product-expiry-date'><strong>Expiry Date:</strong> {product.expiryDate}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading product...</p>
                )}
            </div>

            <Dialog open={openDialog} onClose={cancelRedeem}>
                <DialogTitle>Confirm Redeem</DialogTitle>
                <DialogContent>
                    Are you sure you want to redeem this product?
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelRedeem}
                            style={{ 
                                backgroundColor: 'black', 
                                color: 'white',
                                height: '40px', 
                                width: '100px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                marginRight:'10px'
                            }}>
                        Cancel
                    </Button>
                    <Button onClick={confirmRedeem} 
                            style={{ 
                                backgroundColor: 'orange', 
                                color: 'white',
                                height: '40px', 
                                width: '100px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Detail;
