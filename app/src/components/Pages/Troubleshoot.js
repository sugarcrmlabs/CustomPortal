import React from 'react'
import {Link} from 'react-router-dom'

class QuestionItem extends React.Component {
    render() {
        const settings = this.props.setup;

        if (!settings.isLast) {
            return (
                <div class="steps my-hidden">
                    <div class="question">
                        {settings.question}
                    </div>
                    <div class="buttons">
                        <button type="button" class="btn btn-primary myPrimary next-step" onClick={this.props.nextStep}>Yes</button>
                        <button type="button" class="btn btn-primary myPrimary next-step" onClick={this.props.nextStep}>No</button>
                        <div class="separator"></div>
                        <button type="button" class="btn btn-primary myPrimary prev-step" onClick={this.props.prevStep}>
                            Go back to previous question
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="steps my-hidden">
                    <div class="solution">
                        {settings.question}
                        <a href={localStorage.getItem('sugar_url') + "#KBContents/e20de8e0-0417-a317-16ff-57bc48c57b04"}
                           target="_blank">Find Your WiFi
                            Password and Network Name</a>
                    </div>
                    <Link to="/" className="btn btn-primary">Home</Link>
                </div>
            )
        }
    }
}
class Troubleshoot extends React.Component {
    constructor(props) {
        super(props);

        this.findAncestor = this.findAncestor.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    nextStep(e) {
        var parent = this.findAncestor(e.currentTarget, 'steps');

        parent.style.display = "none";
        parent.nextSibling.style.display = "block";
    }

    prevStep(e) {
        var parent = this.findAncestor(e.currentTarget, 'steps');

        parent.style.display = "none";
        parent.previousSibling.style.display = "block";
    }

    render() {
        const problems = ['I do not have a tone.',
            'I cannot make or receive telephone calls.',
            'I cannot make an outgoing call.',
            'I am not receiving incoming calls.',
            'I cannot make or receive telephone calls.',
            'There are problems with the sound quality of my calls.',
            'I need assistance setting up my adapter.'];

        const questions = [
            {
                question: 'Is the Phone light on your adapter either solidly lit or slowly blinking?',
                isFirst: 1,
                isLast: 0
            }, {
                question: 'Do you have a dial tone?',
                isFirst: 0,
                isLast: 0
            }, {
                question: 'Did your call complete successfully?',
                isFirst: 0,
                isLast: 0
            }, {
                question: 'For further information check out this article:',
                isFirst: 0,
                isLast: 1
            }
        ];

        return (
            <div>
                <h2 class="no-margin-top">Troubleshoot</h2>
                <div id="troubleshooting">
                    <div class="steps">
                        Select the problem that describes your situation the best:
                        <ul>
                            {problems.map(function (problem) {
                                return <li>
                                    <div class="next-step" onClick={this.nextStep}>{problem}</div>
                                </li>;
                            }, this)}
                        </ul>
                    </div>
                    {questions.map(function (question) {
                        return <QuestionItem setup={question} nextStep={this.nextStep} prevStep={this.prevStep}/>
                    }, this)}
                </div>
            </div>
        )
    }
}

export default Troubleshoot
