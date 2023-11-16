import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import data from '../../data.json';
import './Home.scss'
import {Link} from "react-router-dom";

const Home = () => {
    const [movieData,setMovieData] = useState(data);
    const [videoToPlay,setVideo] = useState(null)
    const hasFeaturedMovie = JSON.parse(sessionStorage.getItem('featuredMovie')) || data.Featured;
    const [featuredMovie,setFeaturedMovie] = useState(hasFeaturedMovie)
    const sliderRef = useRef(null);
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        initialSlide:+featuredMovie.Id -1,
        slidesToShow: 8,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1830,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1565,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1360,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1160,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    useEffect(() => {
        setMovieData(data)
    }, [featuredMovie]);

    const handleMouseWheel = (event) => {
        if (event.deltaY > 0) {
            sliderRef.current.slickNext();
        } else {
            sliderRef.current.slickPrev();
        }
    };

    const changeFeaturedMovie = (movie) => {
        setVideo('')
        setFeaturedMovie(movie);
        sessionStorage.setItem('featuredMovie',JSON.stringify(movie));
        setTimeout(()=>{
            setVideo(movie.VideoUrl)
        },2000)
    }

    const getHoursAndMintes = (sec) => {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        return `${hours}h ${minutes}m`
    }
    return (
         <div className='main_page'>
             <div className='main_section'>
                 <div className='cover_image_block'>
                     {videoToPlay ?
                         <video autoPlay muted loop>
                             <source src={videoToPlay} type="video/mp4" />
                         </video>
                          : <img src={`/images/${featuredMovie.CoverImage}`} alt='' title=''/>}
                 </div>
                     <div className='main_menu'>
                         <div className='account_block'>
                             <img src='/images/user.jpg' alt="" title="" />
                             <div className='user_name'>Sargis</div>
                         </div>
                         <Link to='/movie_page'>
                             <div className='menu_item'>
                                 <img src='/icons/ICON-Search.png' alt="" title=""/>
                                 <div className='menu_item_name'>
                                    Search
                                </div>
                             </div>
                         </Link>
                         <Link to='/movie_page'>
                             <div className='menu_item active'>
                                 <img src='/icons/Group46.png' alt="" title=""/>
                                 <div className='menu_item_name'>
                                     Home
                                 </div>
                             </div>
                         </Link>
                         <Link to='/movie_page'>
                             <div className='menu_item'>
                                 <img src='/icons/Group47.png' alt="" title=""/>
                                 <div className='menu_item_name'>
                                     TV Shows
                                 </div>
                             </div>
                         </Link>
                         <Link to='/movie_page'>
                             <div className='menu_item'>
                                 <img src='/icons/Group53.png' alt="" title=""/>
                                 <div className='menu_item_name'>
                                     Movies
                                 </div>
                             </div>
                         </Link>
                         <Link to='/movie_page'>
                             <div className='menu_item'>
                                 <img src='/icons/Group54.png' alt="" title=""/>
                                 <div className='menu_item_name'>
                                     Genres
                                 </div>
                             </div>
                         </Link>
                         <Link to='/movie_page'>
                             <div className='menu_item'>
                                 <img src='/icons/Group56.png' alt="" title=""/>
                                 <div className='menu_item_name'>
                                     Watch Later
                                 </div>
                             </div>
                         </Link>
                         <div className='menu_bottom_helper'>
                             <div className='help_item'>Language</div>
                             <div className='help_item'>Get Help</div>
                             <div className='help_item'>Exit</div>
                         </div>
                     </div>
                     <div className='movie_section'>
                         <div className='info_section'>
                             <div className='info_category'>
                                 {featuredMovie.Category}
                             </div>
                             <div className='info_logo'>
                                 <img src={`/images/${featuredMovie.TitleImage}`} title='' alt=''/>
                             </div>
                             <div className='info_date'>
                                 {featuredMovie.ReleaseYear + ' '
                                     + featuredMovie.MpaRating + ' '
                                     + getHoursAndMintes(featuredMovie.Duration)}
                             </div>
                             <div className='info_desc'>
                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                             </div>
                             <div className='actions_block'>
                                 <button className="play_button">Play</button>
                                 <button className="more_button">More Info</button>
                             </div>
                         </div>
                         <div onWheel={handleMouseWheel} className='trending_now_section'>
                             <div className='block_title'>Trending Now</div>
                             <Slider ref={sliderRef} {...sliderSettings}>
                                 {movieData.TrendingNow && movieData.TrendingNow.map((movie)=> {
                                     return <div onClick={() => changeFeaturedMovie(movie)} key={movie.Title}><img src={`/images/${movie.CoverImage}`} alt='' title='' /></div>
                                 })}
                             </Slider>
                         </div>
                     </div>
             </div>
         </div>
     )
}

export default Home