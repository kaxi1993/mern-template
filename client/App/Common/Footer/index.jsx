import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss'

function Footer () {
    return (
        <footer className='mt-footer'>
            <div className='mt-footer__info'>
                <div className='mt-container'>
                    <div className='mt-footer__inner'>
                        <div className='mt-footer__section'>
                            <h5 className='mt-footer__section-title'>
                                Services
                            </h5>
                            <ul className='mt-footer__section-list'>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>Service One</a>
                                </li>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>Service Two</a>
                                </li>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>Service Three</a>
                                </li>
                            </ul>
                        </div>
                        <div className='mt-footer__section'>
                            <h5 className='mt-footer__section-title'>
                                About Us
                            </h5>
                            <ul className='mt-footer__section-list'>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>Teams</a>
                                </li>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>Careers</a>
                                </li>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>Affiliates</a>
                                </li>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>Referrals</a>
                                </li>
                            </ul>
                        </div>
                        <div className='mt-footer__section'>
                            <h5 className='mt-footer__section-title'>
                                Help & FAQ
                            </h5>
                            <ul className='mt-footer__section-list'>
                                <li className='mt-footer__list-item'>
                                    <Link to='/terms' className='mt-footer__item-link'>Terms of Service</Link>
                                </li>
                                <li className='mt-footer__list-item'>
                                    <Link to='/privacy' className='mt-footer__item-link'>Privacy Policy</Link>
                                </li>
                                <li className='mt-footer__list-item'>
                                    <a href='#' className='mt-footer__item-link'>FAQ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-footer__social'>
                <ul className='mt-footer__social-list'>
                    <li className='mt-footer__social-item'>
                        <a href='https://facebook.com' className='mt-footer__social-link' target='_blank'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='mt-footer__social-icon'><path d='M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z' /></svg>
                        </a>
                    </li>
                    <li className='mt-footer__social-item'>
                        <a href='https://twitter.com' className='mt-footer__social-link' target='_blank'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='mt-footer__social-icon'><path d='M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z' /></svg>
                        </a>
                    </li>
                    <li className='mt-footer__social-item'>
                        <a href='https://google.com' className='mt-footer__social-link' target='_blank'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='mt-footer__social-icon'><path d='M318.2 230.9l-1.6-7H160V288h90.7c-9.4 45-48.4 63.6-84.1 63.6-26 0-50.2-7.8-68.3-25.3-18.6-18.1-28.9-43.1-28.9-70.4 0-27.1 9.8-51.8 27.6-69.6 17.7-17.7 42-25.4 68.7-25.4 30.5 0 49.9 13.8 58.1 21.1l48-47.7C258.3 122.6 221.5 93 164.1 93c-44.3 0-86.7 16.8-117.7 47.8C15.9 171.3 0 215.2 0 256s15 82.6 44.6 113.3C76.3 402 121.2 419 167.5 419c42.1 0 81.9-16.5 110.3-46.3 28-29.4 42.4-70.1 42.4-112.7-.1-18-1.9-28.7-2-29.1zM512 224h-57v-57h-41v57h-57v41h57v57h41v-57h57z' /></svg>
                        </a>
                    </li>
                    <li className='mt-footer__social-item'>
                        <a href='https://youtube.com' className='mt-footer__social-link' target='_blank'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='mt-footer__social-icon'><path d='M508.6 148.8c0-45-33.1-81.2-74-81.2C379.2 65 322.7 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.6-.1 220.2 0 255.8c-.1 35.6 1 71.2 3.4 106.9 0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8 60.8.2 120.3-1 178.6-3.8 40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107 .2-35.6-.9-71.2-3.3-106.9zM207 353.9V157.4l145 98.2-145 98.3z' /></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
