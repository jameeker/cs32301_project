import React from 'react';
import './about.css';
import { NavButtonBar } from '../../components';
import logoImg from '../../assets/logo_placeholder_512.png';
import sideImg1 from '../../assets/about1.jpg';
import sideImg2 from '../../assets/about2.jpg';

const rawNames = [
  'Will Allen',
  'Jack Miller',
  'Jamie Meeker',
  'Maha Shakshuki',
  'Isra Shaikh'
];

const colors = ['#ffffcc', '#ccffcc', '#ccffff', '#ffccff'];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const PageAbout = () => {

  const shuffledNames = shuffle(rawNames);

  const notes = [
    ...shuffledNames.map((name, i) => ({
      id: i,
      content: name,
      color: getRandomColor(),
      position_x: 30 + i * 100,
      position_y: 350
    })),
    {
      id: 'created-by',
      content: 'Created By:',
      color: '#ffffcc',
      position_x:  30 + shuffledNames.length * 100,
      position_y: 350
      
    }
  ];

  return (
    <div className="about-page">
      <NavButtonBar />
      <div className="about-header">
        <h1>About __WEBSITE NAME__</h1>
        <img src={logoImg} alt="logo" className="about-logo-inline" />
        </div>

      <div className="about-content">
        <div className="about-board">
        <div className="about-notes">
            {notes.map(note => (
              <div
                key={note.id}
                className="note"
                style={{
                  backgroundColor: note.color,
                  left: `${note.position_x}px`,
                  top: `${note.position_y}px`,
                  position: 'absolute',
                  padding: '15px',
                  width: '150px',
                  minHeight: '100px',
                  borderRadius: '4px',
                  boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                  fontFamily: "'Comic Sans MS', cursive"
                }}
              >
                {note.content}
              </div>
            ))}
          </div>
          <p>
            This is an interactive, anonymous online community bulletin board where users can leave messages and interact with others freely.
            Everything on the board expires after 24 hours, ensuring a fresh and comfortable space for interaction.
          </p>
          <p>
            Bulletin Boards can be found in just about any public space: libraries, coffee shops, & more. They serve to allow communities to communicate directly with one another, and can quickly be flooded with overlapped papers. With <strong>__WEBSITE NAME__</strong>, you can communicate anonymously on a virtual Bulletin Board. Daily prompts will be generated on pieces of paper, which may act as a discussion starter, or you may choose to ignore them and submit an unrelated note.
          </p>
          <p>
            Impermanence is one of <strong>__WEBSITE NAME__</strong>’s core values, as after 24 hours, all of the notes on the board will be reset, and new prompts will be posted. However, you can save any notes you’d like to your personal board to keep them for future reference.
          </p>
        </div>

        <div className="about-images">
          <img src={sideImg1} alt="about visual 1" className="side-img" />
          <img src={sideImg2} alt="about visual 2" className="side-img" />
        </div>

        
      </div>
    </div>
  );
};

export default PageAbout;