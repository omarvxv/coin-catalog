import styled, {css} from "styled-components";

export const InputBlock = styled.div`
    width: 23.35rem;
    height: 4.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    font-size: 1rem;
`;

export const InputName = styled.span`
    transition: font-size .2s linear;
    font-weight: 500;
    font-size: 0.87em;
    line-height: 1em;
    color: #000000;
`;

export const Input = styled.input`
    width: 23.35em;
    height: 3rem;
    border: 1px solid #000000;
    padding: 0.3em 0.6em;
    outline: none;
    font-size: 1em;
    ${({short})=> short && css`
        width: 11.07em;
    `}
`;

export const Interval = styled.div`
    transition: font-size .2s linear;
    width: 27.05em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875em;
    font-weight: 300;
`;

export const SearchForm = styled.div`
    position: relative;
`;

export const SearchField = styled.div`
    width: 32.75em;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 1em;
    font-size: 1rem;
    a{
        text-decoration: none;
    }
    ${({homePage})=> homePage && css`
    margin-top: 1.56em;
  `}
`;

export const Filter = styled.div`
    font-weight: 300;
    font-size: 0.875rem;
    line-height: 1.07em;
    text-decoration-line: underline;
    transition: all .2s linear;
    color: #000000;
    display: flex;
    cursor: pointer;
    width: 7.86em;
    justify-content: space-between;
    margin-top: 0.71em;
    img{
        width: 1.07em;
        height: 0.71em;
        align-self: center;
    }
`;

export const AdvancedFilter = styled.div`
    font-size: 1rem;
    position: absolute;
    padding: 1.875em 2.812em;
    transition: all .2s linear;
    left: -1.56em;
    z-index: 10;
    background-color: white;
    top: calc(100% + 1.1rem);
    grid-gap: 1.25em 1.875em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.75);
    border-radius: 5px;
    @media screen and (max-width: 850px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const AdvancedFilterColumn = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-row-gap: 1rem;
`;

export const Button = styled.button`
    width: 8.57em;
    height: 3.43em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: font-size .2s linear;
    background: #833AE0;
    font-size: 0.875rem;
    line-height: 1.14em;    
    color: #FFFFFF;
    border: none;
    outline: none;
    cursor: pointer;
    ${props => props.negative && css`
        background: #E5E5E5;;
        color: black;
  `}
`;

export const Buttons = styled.div`
    display: flex;
    width: 16.875rem;
    justify-content: space-between;
    a{
        text-decoration: none;
        height: fit-content;
    }
`;

export const HeaderBlock = styled.div`
    display: flex;
    position: relative;
`;

export const PageName = styled.div`
    transition: font-size .2s linear;
    font-weight: 300;
    font-size: 3.125rem;
    line-height: 1.1em;
    color: #000000;
    white-space: nowrap;
`;

export const Hierarchy = styled.div`
    font-weight: 500;
    font-size: 0.62rem;
    line-height: 0.7em;
    transition: font-size .2s linear;
    a{
        text-decoration-line: underline;
        color: #B1ABAB;
    }
    color: #B1ABAB;
`;

export const User = styled.span`
    display: flex;
    margin-left: auto;
    align-items: center;
    height: fit-content;
    img{
        margin: 0 0.3rem 0 auto;
        width: 2rem;
        height: 2rem;
    }
    a{
        height: fit-content;
        width: fit-content;
        text-decoration: none;
    }
`;

export const UserName = styled.div`
    font-weight: 300;
    font-size: 1.25rem;
    line-height: 1.375em;
    color: #000000;
    cursor: pointer;
    height: fit-content;
`;

export const Description = styled.textarea`
    font-size: 1.125rem;
    width: 20.78em;
    height: 7.5em;
    border: 1px solid #000000;
    resize: none;
    outline: none;
    padding: 0.28em 0.55em;
    transition: all .2s linear;
`;

export const DescriptionBlock = styled.div`
    height: 9.5rem;
    display: flex;
    transition: all .2s linear;
    flex-direction: column;
    justify-content: space-between;
`;

export const DropDownLine = styled.div`
    width: 23.375em;
    transition: all .2s linear;
    height: 3em;
    border: 1px solid #000000;
    padding: 0.3125em 0.625em;
    outline: none;
    font-size: 1rem;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    img{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1em;
        width: 0.875em;
        height: 0.5em;
    }
`;

export const DropDownContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    max-height: 11.25em;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    top: 100%;
    z-index: 20;
    background-color: white;
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.75);
    border-radius: 3px;
`;

export const DropDownItem = styled.div`
    cursor: pointer;
    padding: 1.25em 0.9375em;
    font-size: 1rem;
    transition: all .1s linear;
    text-transform: capitalize;
    &:hover{
    opacity: 0.8;
`;

export const NotificationLine = styled.div`
    position: absolute;
    min-width: 25em;
    width: fit-content;
    background-color: gainsboro;
    border: 1px solid gainsboro;
    border-radius: 3px;
    padding: 0.9375em 1.25em;
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.75);
    font-weight: 300;
    font-size: 1rem;
    left: 50%;
    z-index: 30;
`;

export const RecentlyBlock = styled.div`
    min-width: 12.5em;
    height: fit-content;
    transition: all .2s linear;
    padding: 0.9375em;
    font-size: 1rem;
    border-radius: 3px;
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.75);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.3125em 0.625em;
    position: absolute;
    top: 85%;
    right: 0;
    z-index: 50;
    background-color: white;
    img{
        width: 5em;
        height: 5em;
    }
    a{
        width: fit-content;
    }
`;

export const RecentlyLink = styled.div`
    margin-top: 1.25em;
    display: flex;
`;

export const RecentlyIcon = styled.div`
    align-self: center;
    position: relative;
    transition: all .2s linear;
    img{
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
    }
    &:hover{
        transform: scale(1.07);
    }
`;

export const RecentlyCount = styled.div`
    width: 1.5em;
    height: 1.5em;
    font-size: 0.75rem;
    border-radius: 50%;
    color: white;
    background-color: #833AE0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -0.3em;
    right: -0.4em;
`;

export const AccountCommands = styled.div`
    width: fit-content;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid darkgray;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    position: absolute;
    top: 1.8rem;
    overflow: hidden;
    right: 0;
    z-index: 51;
    background-color: white;
    a{
        width: 100%;
        border-bottom: 1px solid darkgray;
        color: rgba(0,0,0,0.6);
        text-decoration: none;
        padding: 0.5em 2em;
        font-size: 1.2rem;
        text-align: center;
        transition: all .1s linear;
        &:hover{
            color: rgba(0,0,0,0.9);
        }
    }
`;