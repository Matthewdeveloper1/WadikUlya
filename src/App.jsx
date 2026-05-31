import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import ripped from './assets/ripped.WebP';
import left from './assets/left.WebP';
import right from './assets/right.WebP';
import lera from './assets/leraRamka.WebP';
import mark from './assets/markRamka.WebP';
import flower from './assets/flower.WebP';
import tree from "./assets/place.png";
import heart from "./assets/heart.WebP";
import mainph from './assets/main.png';
import './App.css';

function App() {
  const [isScrollingBlocked, setIsScrollingBlocked] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isArrowVisible, setArrowVisible] = useState(true);
  const [appReady, setAppReady] = useState(false); 
  const [animateLeftRight, setAnimateLeftRight] = useState(false);

  const flowerAnimation = useSpring({
    transform: appReady && scrollY > 400 ? 'translateX(0)' : 'translateX(-100vw)',
    opacity: appReady && scrollY > 400 ? 1 : 0,
  });

  const heartAnimation = useSpring({
    opacity: scrollY > 3400 ? 1 : 0,
    config: { duration: 700 },
  });

  const leftAnimation = useSpring({
    transform: animateLeftRight ? 'translateX(-50px)' : 'translateX(0)',
    config: { tension: 220, friction: 20 },
  });

  const rightAnimation = useSpring({
    transform: animateLeftRight ? 'translateX(50px)' : 'translateX(0)',
    config: { tension: 220, friction: 20 },
  });

  useEffect(() => {
    const images = [ripped, left, right, lera, mark, flower, tree, heart, mainph];
    
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all([...imagePromises, document.fonts.ready]).then(() => {
      setAppReady(true);
      setTimeout(() => setAnimateLeftRight(true), 100);
    });
  }, []);

  useEffect(() => {
    if (appReady) {
      const timer = setTimeout(() => {
        setIsScrollingBlocked(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [appReady]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 0 && isArrowVisible) {
        setArrowVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isArrowVisible]);

  useEffect(() => {
    document.body.style.overflow = isScrollingBlocked ? 'hidden' : 'auto';
  }, [isScrollingBlocked]);

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  if (!appReady) {
    return (
      <div className="loader-wrapper">
        <div className="shimmering-ring"></div>
        <div className="loader-text">Загрузка</div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="firstPage">
        <div className='convert'>
          <animated.img style={leftAnimation} className='left' src={left} alt="Left" />
          <animated.img style={rightAnimation} className='right' src={right} alt="Right" />
        </div>
        <div className='mainText'>
          <img className='mainph' src={mainph} alt='tree' />
          <div className='wedday'>
            <h1 className=''>Wedding </h1>
            <h1 className=''>Day </h1>
          </div>
        </div>
        <div className='des'>
          <a className='WadimUlya'>Wadim & Uliana</a>
          <a className='date'>21.06.2026</a>
        </div>
        {isArrowVisible && (
          <div className="scroll-indicator">
            <div className="arrow-down"></div>
          </div>
        )}
      </div>

      <div className='second'>
        <div className='secondtext'>
          <div className='inviteTitle'>
            <h1 className='inviteTitle'>Wedding<br />Invintation</h1>
          </div>
          <div className='inviteText'>
            <a>
              Мы давно ждали момента, когда вместе с вами сможем разделить самый важный и счастливый день в нашей жизни - день нашей свадьбы!
            </a>
          </div>
        </div>
      </div>
      <div className='four'>
        <animated.img style={flowerAnimation} className='flower' src={flower} alt='flower' />
        <div className='border'>
          <a className='fourText'>
            <h1 className='fourTitle'>June</h1>
            <div className="calendar">
              <div className="week">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
              </div>
              <div className="week">
                <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
              </div>
              <div className="week">
                <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span className="day">21</span>
              </div>
              <div className="week">
                <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
              </div>
              <div className="week">
                <span>29</span><span>30</span><span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className='place'>
        <h1 className='placeTitle'>Location</h1>
        <img className='tree' src={tree} alt='tree' />
        <p className='placetext'>
          Cвадьба пройдет в Агроусадьбе «Семисоcны»
          Она находится по адресу:
          д. Семисосны, 6/1
        </p>
      </div>
      <div className='program'>
        <div className='border'>
          <h1 className='titleProgramm'>
            Wedding<br /> Program
          </h1>
          <div className='programSections'>
            <p className='section'><span className='time'>13:00</span><span className='divider'></span><span className='event'>Сбор гостей</span></p>
            <p className='section'><span className='time'>14:00</span><span className='divider'></span><span className='event'>Бракосочетание </span></p>
            <p className='section'><span className='time'>14:30</span><span className='divider'></span><span className='event'>Поздравления</span></p>
            <p className='section'><span className='time'>15:30</span><span className='divider'></span><span className='event'>Банкет</span></p>
            <p className='section'><span className='time'>16:00</span><span className='divider'></span><span className='event'>Программа</span></p>
            <p className='section'><span className='time'>16:30</span><span className='divider'></span><span className='event'>Перерыв</span></p>
            <p className='section'><span className='time'>17:00</span><span className='divider'></span><span className='event'>Программа</span></p>
            <p className='section'><span className='time'>18:30</span><span className='divider'></span><span className='event'>Перерыв</span></p>
            <p className='section'><span className='time'>19:00</span><span className='divider'></span><span className='event'>Программа</span></p>
            <p className='section'><span className='time'>20:30</span><span className='divider'></span><span className='event'>Завершение</span></p>
          </div>
        </div>
      </div>
      
      <div className='togPhoto'></div>
      
      <div className='details'>
        <h1 className='detailsTitle'>Details</h1>
        <span className='detailsText'>
          1. Наш праздник-для взрослых, поэтому просим Вас оставить детей под присмотром перед приездом на торжество.<br />
          <br/>
          2. О подарках: Ваши пожелания в конвертах помогут осуществить наши мечты. Пожалуйста, не дарите нам цветы, мы очень расстроимся, когда не сможем забрать их с собой.<br />
          <br/>
          3. Если Вы планируете подготовить креативный номер, который требует подготовки, Вы можете связаться с нашим ведущим Василием +375297458876, он поможет с организацией!<br />
          <br/>
          4. Просим подтвердить Ваше присутствие на нашем празднике до 10.06.2026.<br />
          <br/>
          5. Цветовая гамма нашей свадьбы представлена ниже, просим поддержать ее при выборе Вашего наряда:
        </span>
      </div>
      
      <div className='dress'>
        <div className='programDress'>
          <div className='border'>
            <div className='titleBlock'>
              <h1 className='titleDress'>Dress code</h1>
              <div className='dressSections'>
                <p className='dressText'>
                  Будем рады видеть вас в цветах, которые мы выбрали для праздника - это добавит особое настроение.
                </p>
                <div className='colors'>
                  <span className='cafe'> </span>
                  <span className='kombu'> </span>
                  <span className='moss'> </span>
                  <span className='tan'> </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='seeU'>
        <div className='seeUText'>See you in june <br /> 21.06</div>
      </div>
      
      <div className='last'>
        {/* <animated.img style={heartAnimation} className='heart' src={heart} alt='heart' /> */}
      </div>
    </div>
  );
}

export default App;