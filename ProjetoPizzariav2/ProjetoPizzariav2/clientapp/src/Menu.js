import React, { useState } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap';

// export default function Menu() {

//     let saida = 
//     <nav className='menu'>
//         <Link to="/gerenciarAlunos">Gerenciar Alunos</Link> |
//         <Link to="/consultarAlunos">Consultar Alunos</Link>
//         <Link to="/matricular">Matricular</Link>
//     </nav> 

//     return saida;
// } 



const Menu = (props) => {

 const [dropdownOpen, setDropdownOpen] = useState(false);


   const toggle2 = () => setDropdownOpen(!dropdownOpen);

const [isOpen, setIsOpen] = useState(false);

const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Inicio</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Gerenciar Alunos
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/gerenciarAlunos">Cadastrar</DropdownItem>
                <DropdownItem href="/consultarAlunos">Consultar</DropdownItem>
                <DropdownItem href="/Matricular">Matricular</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Cadastros
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/gerenciarAlunos">Cadastrar</DropdownItem>
                <DropdownItem href="/consultarAlunos">Consultar</DropdownItem>
                <DropdownItem href="/Matricular">Matricular</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div> 
  )


  //   return (
  //       <div>
  //     <Navbar color="primary" dark expand="md">
  //       <NavbarBrand href="/">Inicio</NavbarBrand>
  //       <NavbarToggler onClick={toggle} />
  //       <Collapse isOpen={isOpen} navbar>
  //         <Nav className="mr-auto" navbar>
  //           <NavItem>
  //             <NavLink href="/gerenciarAlunos">Alunos</NavLink>
  //           </NavItem>
  //           <NavItem>
  //             <NavLink href="/consultarAlunos">
  //               Consultar
  //             </NavLink>
  //           </NavItem>
  //            <NavItem>
  //             <NavLink href="/Matricular">
  //               Matricular
  //             </NavLink>
  //           </NavItem>
  //         </Nav>
  //       </Collapse>
  //     </Navbar>
  //   </div> 
  // )

}





export default Menu;






// export default function Menu(args) {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggle = () => setIsOpen(!isOpen);
//     let saida = 
//     <div>
//       <Navbar {...args}>
//         <NavbarBrand href="/">reactstrap</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="me-auto" navbar>
//             <NavItem>
//               <NavLink href="/gerenciarAlunos">Alunos</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/consultarAlunos">
//                 Consultar
//               </NavLink>
//             </NavItem>
//              <NavItem>
//               <NavLink href="/Matricular">
//                 Matricular
//               </NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div> 

//     return saida;
// } 


