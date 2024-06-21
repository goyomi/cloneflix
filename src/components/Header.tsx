import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogoSvg, SearchIconSvg } from "../svg";

const Nav = styled(motion.nav)`
  padding: 2rem 6rem;
  width: 100%;
  height: 6rem;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  font-size: 1.4rem;
  z-index: 100;
  font-size: 1.5rem;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 5rem;
  width: 9.5rem;
  height: 2.5rem;
  path {
    stroke-width: 0.8rem;
    stroke: ${(props) => props.theme.red};
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 2rem;
  position: relative;
  color: ${(props) => props.theme.white.darker};
`;

const Circle = styled(motion.span)`
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.red};
`;

const SearchBar = styled(motion.form)`
  display: flex;
  align-items: center;
  gap: 1rem;
  svg {
    width: 1.5rem;
  }
`;

const Input = styled(motion.input)`
  width: 20rem;
  padding: 0.5rem;
  transform-origin: right center;
  background-color: transparent;
  border: 0.1rem solid #fff;
  border-radius: 0.5rem;
  color: #fff;
`;

const logoVariants = {
  start: { pathLength: 0, fill: "rgba(229, 16, 19, 0)" },
  action: {
    pathLength: 1,
    fill: "#E51013",
    transition: { pathLength: { duration: 10 }, fill: { duration: 3, delay: 2 } },
  },
};

const navVariants = {
  top: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const movieMatch = useMatch("/movie");
  const inputAnimation = useAnimation();
  const scrollAnimation = useAnimation();
  const { scrollY } = useScroll();

  const { register, handleSubmit, watch } = useForm<IForm>();
  const keyword = watch("keyword");

  useEffect(() => {
    if (onFocus || keyword) {
      scrollAnimation.start("scroll");
    } else {
      scrollAnimation.start(scrollY.get() > 30 ? "scroll" : "top");
    }
  }, [onFocus, scrollAnimation, scrollY, keyword]);

  const openSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else if (!searchOpen) {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  const history = useNavigate();

  const onValid = (data: IForm) => {
    history(`/search?keyword=${data.keyword}`);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => setOnFocus(true);
  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => setOnFocus(false);

  return (
    <Nav variants={navVariants} initial="top" animate={scrollAnimation}>
      <Col>
        <Link to={"/"}>
          <Logo
            variants={logoVariants}
            initial="start"
            animate="action"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
          >
            <LogoSvg />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to="/">Home</Link>
            {homeMatch && <Circle layoutId="circleDot" />}
          </Item>
          <Item>
            <Link to="/movie">Movie</Link>
            {movieMatch && <Circle layoutId="circleDot" />}
          </Item>
          <Item>
            <Link to="/tv">TV Shows</Link>
            {tvMatch && <Circle layoutId="circleDot" />}
          </Item>
        </Items>
      </Col>
      <Col>
        <SearchBar onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            onFocus={handleFocus}
            onBlur={handleOnBlur}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ ease: "linear" }}
            type="text"
            placeholder="Title, Person, Genre"
          />
          <motion.svg onClick={openSearch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white">
            <SearchIconSvg />
          </motion.svg>
        </SearchBar>
      </Col>
    </Nav>
  );
}

export default Header;
