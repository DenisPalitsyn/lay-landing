import React from 'react';
import styles from './index.module.scss';
import classnames from 'classnames/bind';
import {ReactComponent as Logo} from "../../assets/images/colorLogo.svg";
import introImg from '../../assets/images/intro.jpg';
import contentPic1 from '../../assets/images/contentPic1.jpg';
import contentPic2 from '../../assets/images/contentPic2.jpg';
import {StatusType} from "../../App";

let cx = classnames.bind(styles);

function Landing(
  {
    onSubmit,
    email,
    onChange,
    status,
    resetStatus
  } : {
    onSubmit: () => void,
    email: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    status: StatusType,
    resetStatus: () => void
  }
): JSX.Element {

  const success = status === 'success';
  const error = status === 'error';
  const loading = status === 'loading';

  return (
    <div className={cx('landing')}>
      {(success || error) &&
        <div className={cx('modal-bg')}>
          <div className={cx('modal')}>
            {success && <span>E-Mail gesendet</span>}
            {error && <span>Unbekannter Fehler. Versuche es später</span>}
            <button type="button" onClick={resetStatus} className={cx('btn')}>Ok</button>
          </div>
        </div>
      }
      <div className={cx('intro-img')}>
        <img src={introImg} alt="girl"/>
      </div>
      <header className={cx('header')}>
        <div className={cx('header__wrap')}>
          <Logo className={cx('logo')}/>
        </div>
      </header>
      <div className={cx('intro-img-mobile')}>
        <img src={introImg} alt="girl"/>
      </div>
      <div className={cx('container')}>
        <div className={cx('intro')}>
          <h1 className={cx('title')}>Arbeit für Frauen<br/>in Deutschland.</h1>
          <span className={cx('subtitle')}>Sind Sie gesellig und selbstbewusst?<br/>Dann ist dieser Job für Sie!</span>
        </div>
        <div className={cx('content')}>
          <div className={cx('first')}>
            <div className={cx('pic')}>
              <img src={contentPic1} alt="responsibilities"/>
            </div>
            <div className={cx('caption')}>
              <span>Pflichten:</span>
            </div>
            <ul>
              <li>arbeiten von überall in Deutschland, sie brauchen nur ein Handy</li>
              <li>Kommunikation mit der aktuellen Kundenbasis</li>
              <li>Geschäftstreffen und Bekanntschaffen mit interessanten Menschen</li>
            </ul>
          </div>
          <div className={cx('second')}>
            <div className={cx('pic', 'mobile')}>
              <img src={contentPic2} alt="suit"/>
            </div>
            <div className={cx('caption')}>
              <span>Sie kommen zu uns, wenn:</span>
            </div>
            <ul>
              <li>Sie wissen, wie man kommuniziert und eine Annäherung an verschiedene Menschen findet</li>
              <li>Sie eine Vielzahl von Themen unterstützen können, von Horoskope bis zur Politik</li>
              <li>Sie eine kompetente Rede haben</li>
            </ul>
            <div className={cx('pic', 'desktop')}>
              <img src={contentPic2} alt="suit"/>
            </div>
          </div>
        </div>
        <div className={cx('form')}>
          <div className={cx('form__title')}>
            <span>Lassen Sie Ihre Kontakte und wir werden uns mit Ihnen verbinden.</span>
          </div>
          <div className={cx('form__actions')}>
            <input type="text" placeholder="deine E-Mail" name="email" value={email} onChange={onChange}/>
            <button
              type="button"
              disabled={loading}
              onClick={onSubmit}
              className={cx('btn')}
            >Senden</button>
          </div>
        </div>
      </div>
      <footer className={cx('footer')}>
        <Logo className={cx('logo')}/>
        <span>(c) 2021</span>
      </footer>
    </div>
  );
}

export default Landing;
