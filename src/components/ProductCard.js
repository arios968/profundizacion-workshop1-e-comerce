import '../styles/ProductCard.css';
import GetInfo from './GetInfo.js';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { context } from '../App';

function ProductCard({ id }) {
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(0);
  const [principalImg, setPrincipalImg] = useState();
  const [flag, setFlag] = useState(false);

  const { cart, setCart } = useContext(context);

  useEffect(() => {
    GetInfo(id)
      .then((res) => {
        setProduct(res);
        setPrincipalImg(res.img[0]);
      })
      .catch((err) => console.log(err));
    setFlag(cart.find((entry) => product.id === entry.id));
  }, []);

  if (product) {
    return (
      <div className="card flex-row">
        <div className="imagesField div__card_img">
          <div className="principalImg">
            <img className="card-img-top img_principal" src={principalImg} />
          </div>

          <div className="secondaryImages">
            <div className="hover__div">
              <img
                className="hover__div_img"
                src={product.img[0]}
                onClick={() => {
                  setPrincipalImg(product.img[0]);
                }}
              />
            </div>
            <div className="hover__div">
              <img
                className="hover__div_img"
                src={product.img[1]}
                onClick={() => {
                  setPrincipalImg(product.img[1]);
                }}
              />
            </div>
            <div className="hover__div">
              <img
                className="hover__div_img"
                src={product.img[2]}
                onClick={() => {
                  setPrincipalImg(product.img[2]);
                }}
              />
            </div>
            <div className="hover__div">
              <img
                className="hover__div_img"
                src={product.img[3]}
                onClick={() => {
                  setPrincipalImg(product.img[3]);
                }}
              />
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='card__info'>
            <h3>{product.company}</h3>
            <h1>{product.product}</h1>
            <p className='card-text'>{product.description}</p>
            <h4 className='card-title h5 h4-sm'>
              ${product.price} k<span>50%</span>
            </h4>

            <h2 className='card-title h5 h4-sm'>$ 250 k</h2>

            <div className='buttons'>
              <div
                className='btn-group'
                role='group'
                aria-label='Basic example'
              >
                <button
                  type='button'
                  className='btn__card '
                  onClick={() => {
                    if (amount !== 0) {
                      setAmount(amount - 1);
                      if (amount !== 1) {
                        setCart(
                          cart.map((entry) => {
                            if (entry !== undefined) {
                              if (entry.id === product.id) {
                                entry.amount = amount;
                              }
                              return entry;
                            }
                          })
                        );
                      } else {
                        setCart(
                          cart.map((entry) => {
                            if (entry !== undefined) {
                              if (entry.id !== product.id) return entry;
                            }
                          })
                        );
                        setFlag(false);
                      }
                    }
                    console.log(cart);
                  }}
                >
                  -
                </button>
                <p type='text' className='btn__card'>
                  {amount}
                </p>
                <button
                  type='button'
                  className='btn__card'
                  onClick={() => {
                    if (!flag) {
                      setCart([
                        ...cart,
                        {
                          id: product.id,
                          img: product.img[0],
                          amount: 1,
                          price: product.price,
                        },
                      ]);
                      setFlag(true);
                    } else {
                      setCart(
                        cart.map((entry) => {
                          if (entry !== undefined) {
                            if (entry.id === product.id) {
                              entry.amount = entry.amount + 1;
                            }
                          }
                          return entry;
                        })
                      );
                    }
                    setAmount(amount + 1);
                    console.log(cart);
                  }}
                >
                  +
                </button>
              </div>
              <button type='button' className='btn__addcar'>
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
