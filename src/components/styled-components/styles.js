import styled, {css} from "styled-components";

export const Input = styled.input`
    width: 374px;
    height: 48px;
    border: 1px solid #000000;
    padding: 5px 10px;
    outline: none;
    font-size: 16px;
    ${({short})=> short && css`
    width: 155px;
  `}
`;

export const InputName = styled.span`
    font-size: 14px;
    line-height: 109%;
    color: #000000;
`;

export const InputBlock = styled.div`
    width: 374px;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
`;

export const Interval = styled.div`
    width: 385px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
`;

export const SearchForm = styled.div`
    position: relative;
`;

export const SearchField = styled.div`
    width: 524px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 25px;
    a{
        text-decoration: none;
    }
    ${({isList})=> isList && css`
    margin-top: 15px;
  `}
`;

export const Filter = styled.div`
    font-weight: 300;
    font-size: 14px;
    line-height: 15px;
    text-decoration-line: underline;
    color: #000000;
    display: flex;
    cursor: pointer;
    width: 110px;
    justify-content: space-between;
    margin-top: 10px;
    img{
        width: 15px;
        height: 10px;
        align-self: center;
    }
`;

export const AdvancedFilter = styled.div`
    position: absolute;
    padding: 30px 45px;
    left: -25px;
    z-index: 10;
    background-color: white;
    top: 130px;
    grid-gap: 20px 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.75);
    border-radius: 5px;
`;

export const Button = styled.button`
    width: 120px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #833AE0;
    font-size: 14px;
    line-height: 16px;    
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
    width: 270px;
    justify-content: space-between;
    a{
        text-decoration: none;
        height: fit-content;
    }
`;

export const PageName = styled.div`
    font-weight: 300;
    font-size: 50px;
    line-height: 53px;
    color: #000000;
    white-space: nowrap;
`;

export const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    `;

export const Admin = styled.span`
    font-weight: 300;
    font-size: 20px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #000000;
`;

export const Description = styled.textarea`
    width: 374px;
    height: 136px;
    border: 1px solid #000000;
    resize: none;
    outline: none;
    padding: 5px 10px;
    font-size: 18px;
`;

export const DescriptionBlock = styled.div`
    height: 156px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const DropDownLine = styled.div`
    width: 374px;
    height: 48px;
    border: 1px solid #000000;
    padding: 5px 10px;
    outline: none;
    font-size: 16px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    img{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 17px;
    }
`;

export const DropDownContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    max-height: 180px;
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
    padding: 20px 15px;
    font-size: 16px;
    transition: all .1s linear;
    &:hover{
    opacity: 0.8;
`;

export const NotificationLine = styled.div`
    position: absolute;
    min-width: 400px;
    width: fit-content;
    background-color: gainsboro;
    border: 1px solid gainsboro;
    border-radius: 3px;
    padding: 15px 20px;
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.75);
    font-weight: 300;
    font-size: 16px;
    left: 50%;
    z-index: 30;
`;

export const RecentlyBlock = styled.div`
    min-width: 200px;
    height: fit-content;
    padding: 15px;
    border-radius: 3px;
    box-shadow: 0 0 20px -10px rgba(0,0,0,0.75);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px 10px;
    position: absolute;
    top: 85%;
    right: 0;
    z-index: 50;
    background-color: white;
    img{
        width: 80px;
        height: 80px;
    }
    a{
        width: fit-content;
    }
`;

export const RecentlyLink = styled.button`
    align-self: center;
    padding: 15px 20px;
    transition: all .1s linear;
    color: blueviolet;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 20px;
    background-color: white;
    font-size: 16px;
    border: none;
    outline: none;
    white-space: nowrap;
    &:hover{
        background-color: blueviolet;
        color: white;
    }
`;