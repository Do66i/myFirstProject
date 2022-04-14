import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactFlagsSelect from 'react-flags-select';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { stateContext } from '../store';

function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const context = useContext(stateContext);

  let subtitle;
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="Home">
      <div className="HomeH1">
        <h1>Remember Trip</h1>
      </div>
      <div className="somediv">
        <section className="section">
          <div className="masthead-image" id="master-container">
            <div className="content center">
              <h1 id="master">
                <div>REMEMBER</div>
                <div id="master-container-scroller">
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      MISSING
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      JUST GO
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      FLEX
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      LOVELY
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      FRIEND
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      FAMILY
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      NEW WORLD
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      PRESENT
                    </a>
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">
                      EVERYTHING
                    </a>
                  </div>
                  <div className="master-container-scroller_item">SAVE</div>
                </div>
                <div>TRIP</div>
              </h1>
            </div>
          </div>
        </section>
      </div>
      <div className="SignLinkBox">
        <div className="SigninLinkBox">
          <Link to="/sign-up">
            <span>함께하기</span>
          </Link>
        </div>
        {context.state.isLogIn ? (
          <>
            {context.funcs.getTrip()}
            <span onClick={openModal}>시작하기</span>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              className="FlagModal"
              appElement={document.getElementById('root') || undefined}
            >
              <div className="InModalBox1">
                <ReactFlagsSelect
                  className="ReactFlagsSelect"
                  selected={selected}
                  onSelect={data => {
                    context.funcs.issueCountry(data);
                    setSelected(data);
                  }}
                  fullWidth={false}
                />
              </div>
              <div className="InModalBox2">
                <DatePicker
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                    context.funcs.startDateHandler(date);
                  }}
                />
                ~
                <DatePicker
                  selected={endDate}
                  onChange={date => {
                    setEndDate(date);
                    context.funcs.endDateHandler(date);
                  }}
                />
              </div>
              <div className="InModalBox3">
                <label className="total-cost" htmlFor="total-cost">
                  Total
                </label>
                <input
                  className="total-costInPut"
                  id="total-coast"
                  type="number"
                  onChange={e => context.funcs.totalCostHandler(e.target.value)}
                />
                {/* <Link to="/mypage"> */}
              </div>
              <div className="InModalBox4">
                <button
                  className="FlagSubmitButton"
                  type="button"
                  onClick={context.funcs.startTrip}
                >
                  Start
                </button>
              </div>
              {/* </Link> */}
            </Modal>
          </>
        ) : (
          <div className="SigninLinkBox">
            <Link to="/sign-in">
              <span>시작하기</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
