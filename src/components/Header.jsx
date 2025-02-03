import chefLogo from "../images/chef-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chefLogo} alt="Chef icon"/>
            <h1>Chef Mistral</h1>
        </header>
    )
}