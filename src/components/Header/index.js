/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaUserAlt,
  FaRegHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaListAlt,
} from 'react-icons/fa';
import { AiOutlinePrinter, AiOutlineCloseSquare } from 'react-icons/ai';
import { VscNewFile } from 'react-icons/vsc';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import * as actions from '../../store/modules/auth/actions';

import {
  Container,
  HamburguerUl,
  HamburguerLi,
  RightUl,
  RightLi,
  Button,
} from './styled';
import Reports from '../Reports';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResizeWindow = () => {
      const menu = document.getElementById('menuHamburguer');
      window.innerWidth > 700 && (menu.style.display = 'none');
    };
    // to prevent the menu from being open
    window.addEventListener('resize', handleResizeWindow);
  }, []);

  const handleHamburguer = () => {
    const menu = document.getElementById('menuHamburguer');
    menu.style.display === 'block'
      ? (menu.style.display = 'none')
      : (menu.style.display = 'block');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.innerWidth <= 700 && handleHamburguer();
    dispatch(actions.loginFailure());
  };

  return (
    <Container>
      <button onClick={handleHamburguer}>
        <svg width="30" height="30">
          <path d="M0,5 30,5" stroke="#fff" strokeWidth="4" />
          <path d="M0,15 30,15" stroke="#fff" strokeWidth="4" />
          <path d="M0,25 30,25" stroke="#fff" strokeWidth="4" />
        </svg>
      </button>

      <HamburguerUl id="menuHamburguer">
        <HamburguerLi>
          <Link to="/item-new/" onClick={handleHamburguer}>
            <VscNewFile /> Novo Item
          </Link>
        </HamburguerLi>
        <HamburguerLi>
          <Link to="/wishlist/" onClick={handleHamburguer}>
            <FaRegHeart /> Desejos
          </Link>
        </HamburguerLi>
        <HamburguerLi>
          <Link to="/categories" onClick={handleHamburguer}>
            <FaListAlt /> Categorias
          </Link>
        </HamburguerLi>
        <HamburguerLi>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleHamburguer();
              setOpen(true);
            }}
          >
            <AiOutlinePrinter /> Relatórios
          </Link>
        </HamburguerLi>
        {isLoggedIn ? (
          <>
            <HamburguerLi>
              <Link to="/register" onClick={handleHamburguer}>
                <FaUserPlus /> Conta
              </Link>
            </HamburguerLi>
            <HamburguerLi>
              <Link to="/logout" onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </Link>
            </HamburguerLi>
          </>
        ) : (
          <>
            <HamburguerLi>
              <Link to="/register" onClick={handleHamburguer}>
                <FaUserAlt /> Registrar
              </Link>
            </HamburguerLi>
            <HamburguerLi>
              <Link to="/login" onClick={handleHamburguer}>
                <FaSignInAlt /> Entrar
              </Link>
            </HamburguerLi>
          </>
        )}
      </HamburguerUl>

      <Link to="/" id="home">
        Inventory
      </Link>

      <RightUl>
        <RightLi>
          <Link to="/item-new/" title="Novo Item">
            <VscNewFile />
          </Link>
        </RightLi>
        <RightLi>
          <Link to="/wishlist/" title="Desejos">
            <FaRegHeart />
          </Link>
        </RightLi>
        <RightLi>
          <Link to="/categories" title="Categorias">
            <FaListAlt />
          </Link>
        </RightLi>
        <RightLi>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            title="Relatórios"
          >
            <AiOutlinePrinter />
          </Link>
        </RightLi>
        {isLoggedIn ? (
          <>
            <RightLi>
              <Link to="/register" title="Conta">
                <FaUserAlt />
              </Link>
            </RightLi>
            <RightLi>
              <Link onClick={handleLogout} to="/logout" title="Sair">
                <FaSignOutAlt />
              </Link>
            </RightLi>
          </>
        ) : (
          <>
            <RightLi>
              <Link to="/register" title="Registrar">
                <FaUserPlus />
              </Link>
            </RightLi>
            <RightLi>
              <Link to="/login" title="Sair">
                <FaSignInAlt />
              </Link>
            </RightLi>
          </>
        )}
      </RightUl>
      <Dialog
        open={open}
        onClose={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <DialogActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            title="Fechar"
          >
            <AiOutlineCloseSquare />
          </Button>
        </DialogActions>
        <Reports />
      </Dialog>
    </Container>
  );
}
