import React, { Component } from "react";
import { XMarkIcon, UserIcon, LinkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { 
    faDribbble, faPinterest, faInstagram, 
    faFacebook, faTwitch, faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

interface LinksProps {
    onUpdate?: (data: string | null) => void;
    data?: any;
}

interface LinksState {
    data: string[];
    inputValue: string;
}

export default class Links extends Component<LinksProps, LinksState> {

    constructor(props: LinksProps) {
        super(props);

        let data: string[] = [];
        if (this.props.data === null || this.props.data === 'undefined' || this.props.data === '')
            data = [];
        else if (typeof this.props.data === 'string')
            data = JSON.parse(this.props.data);
        else if (this.props.data) {
            data = this.props.data.length === 0 ? [] : this.props.data;
        }
    
        this.state = {
            data: data,
            inputValue: ''
        };
    }

    componentDidUpdate(prevProps: Readonly<LinksProps>, prevState: Readonly<LinksState>, snapshot?: any): void {
        if (prevProps.data !== this.props.data) {
            let newData: string[] = [];
            if (!this.props.data || this.props.data === 'undefined' || this.props.data === '') {
                newData = [];
            } else if (typeof this.props.data === 'string') {
                newData = JSON.parse(this.props.data);
            } else if (Array.isArray(this.props.data)) {
                newData = this.props.data.length === 0 ? [] : this.props.data;
            }
            if (JSON.stringify(newData) !== JSON.stringify(this.state.data)) {
                this.setState({ data: newData });
            }
        }
    }

    findIconKeyword(url: string) {
        const keywords = ["dribbble", "twitter", "youtube", "pinterest", "instagram", "facebook", "twitch"];
        for (const keyword of keywords) {
            if (url.includes(keyword)) {
                return keyword;
            }
        }
        return "default";
    }

    getIcon(domain: string) {
        switch (domain) {
            case "dribbble":
                return (<FontAwesomeIcon icon={faDribbble} />);
            case "twitter":
                return (<FontAwesomeIcon icon={faTwitter} />);
            case "youtube":
                return (<FontAwesomeIcon icon={faYoutube} />);
            case "pinterest":
                return (<FontAwesomeIcon icon={faPinterest} />);
            case "instagram":
                return (<FontAwesomeIcon icon={faInstagram} />);
            case "facebook":
                return (<FontAwesomeIcon icon={faFacebook} />);
            case "twitch":
                return (<FontAwesomeIcon icon={faTwitch} />);
            default:
                return (<FontAwesomeIcon icon={faGlobe} />);
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleAddType = () => {
        const { inputValue, data } = this.state;
        if (inputValue.trim() !== '') {
            const newData = [...data, inputValue.trim()];
            this.setState({ data: newData, inputValue: '' }, () => {
                if (this.props.onUpdate) {
                    const data = JSON.stringify(this.state.data);
                    this.props.onUpdate(data);
                }
            });
        }
    }

    handleDeleteType = (index: number) => {
        const newData = [...this.state.data];
        newData.splice(index, 1);
        this.setState({ data: newData }, () => {
            if (this.props.onUpdate) {
                const data = JSON.stringify(this.state.data);
                this.props.onUpdate(data);
            }
        });
    };

    handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault(); 
        if (event.key === 'Enter' && this.state.inputValue.trim() !== '') {
            this.handleAddType();
        }
    };

    renderLinks() {
        return this.state.data.map((link, index) => {
            const keyword = this.findIconKeyword(link);
            return (
                <div className="link" key={index}>
                    <a href={link} target="_blank">
                        { this.getIcon(keyword) }
                    </a>
                    <button
                        type="button"
                        className="button-icon"
                        onClick={() => this.handleDeleteType(index)}
                    >
                        <XMarkIcon />
                    </button>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="form-links">
                <div className="input-icon">
                    <input
                        type="url"
                        name="type"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder="https://dribbble.com/in"
                    />
                    <div className="icon">
                        <LinkIcon />
                    </div>
                </div>
                <div className="list">
                    {this.renderLinks()}
                </div>
            </div>
        );
    }
}
