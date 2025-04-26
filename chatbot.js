const styleSheet = document.createElement('style');
styleSheet.textContent = `
    #fraternity-chatbot {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: #1a1a1a;
        border-radius: 6px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        width: 310px;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Darker Grotesque', 'Segoe UI', sans-serif;
        overflow: hidden;
        border: 1px solid #333;
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px);
    }

    #fraternity-chatbot.visible {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0);
    }

    #fraternity-chatbot.minimized {
        height: 60px;
        border-radius: 8px;
    }

    #fraternity-chatbot.dragging {
        opacity: 0.98;
    }

    .message-header {
        background: #CD1818;
        color: white;
        padding: 10px 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        font-weight: 600;
        cursor: move;
        font-family: 'Syncopate', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    #minimize-chat {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }

    #minimize-chat:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    #chat-messages {
        padding: 16px;
        height: 300px;
        overflow-y: auto;
        background: #1a1a1a;
    }

    .message {
        margin-bottom: 12px;
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }

    .message-content {
        padding: 10px 12px;
        border-radius: 8px;
        max-width: 80%;
        line-height: 1.4;
        font-size: 13px;
    }

    .user-message {
        justify-content: flex-end;
    }

    .user-message .message-content {
        background: #333;
        color: white;
        border-bottom-right-radius: 2px;
    }

    .bot-message .message-content {
        background: #CD1818;
        color: white;
        border-bottom-left-radius: 2px;
    }

    .bot-avatar {
        background: #CD1818;
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
    }

    .typing-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 10px;
        border-radius: 8px;
        background: #333;
        width: fit-content;
        margin-left: 36px;
    }
    
    .typing-dot {
        width: 5px;
        height: 5px;
        background: #aaa;
        border-radius: 50%;
        animation: typingAnimation 1.4s infinite ease-in-out;
    }
    
    .typing-dot:nth-child(1) { animation-delay: 0s; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typingAnimation {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
    }
    
    .message-info {
        display: block;
        color: rgba(255, 255, 255, 0.6);
        font-size: 9px;
        margin-top: 3px;
        font-weight: 500;
    }
    
    .member-card {
        background: #242424;
        border-radius: 4px;
        padding: 12px;
        margin-top: 6px;
        border: 1px solid #333;
        color: white;
    }
    
    .member-card-title {
        font-weight: 600;
        margin-bottom: 8px;
        color: #CD1818;
        font-family: 'Syncopate', sans-serif;
        font-size: 14px;
    }
    
    .member-card-detail {
        display: flex;
        margin-bottom: 6px;
    }
    
    .detail-label {
        width: 80px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 11px;
    }
    
    .detail-value {
        font-size: 11px;
        flex: 1;
        color: white;
    }

    .chat-input-container {
        padding: 12px 16px;
        background: #1a1a1a;
        border-top: 1px solid #333;
        display: flex;
        gap: 8px;
    }

    #chat-input {
        flex: 1;
        padding: 10px 12px;
        border: 1px solid #333;
        border-radius: 16px;
        background: #242424;
        color: white;
        font-size: 13px;
        outline: none;
        transition: all 0.2s;
    }

    #chat-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    #chat-input:focus {
        border-color: #CD1818;
    }

    #send-button {
        background: #CD1818;
        color: white;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
    }

    #send-button svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }

    #send-button:hover {
        transform: scale(1.05);
        background: #b50000;
    }

    #chat-messages::-webkit-scrollbar {
        width: 4px;
    }

    #chat-messages::-webkit-scrollbar-track {
        background: #1a1a1a;
    }

    #chat-messages::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 2px;
    }

    #chat-messages::-webkit-scrollbar-thumb:hover {
        background: #CD1818;
    }
    
    /* Diamond chat toggle button - clean version */
    #chat-toggle {
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 40px;
        height: 40px;
        background: #CD1818;
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 999;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        transform: rotate(45deg);
        outline: none;
    }
    
    #chat-toggle:after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transform: rotate(0deg);
    }
    
    #chat-toggle:hover {
        transform: rotate(45deg) scale(1.05);
        background: #b50000;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    }
    
    #chat-toggle-inner {
        transform: rotate(-45deg);
        font-size: 15px;
        font-weight: bold;
        color: white;
        font-family: 'Syncopate', sans-serif;
        letter-spacing: 0.5px;
    }
    
    #chat-toggle.active {
        transform: rotate(225deg);
    }
`;
document.head.appendChild(styleSheet);
// Create a hardcoded database of brothers
const brothersDatabase = [
    {
        name: "Terell Reed",
        number: "8AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Kamron Hampton",
        number: "0AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Jaden Koranteng",
        number: "1AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Lesley Ofusu",
        number: "2AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Mohammed Cole",
        number: "3AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Christian Sampson",
        number: "4AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Anthony Noakes",
        number: "5AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "David Osadiaye",
        number: "6AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Seydina Salla",
        number: "7AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Marcus McClean",
        number: "9AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Demeir Shipley",
        number: "10AI24FA",
        line: {
            title: "11 Survivors of DestruKtion",
            subtitle: "Kontesting the Kurses of Korruption, While Struggling to Attain the True Value of the Diamond",
            year: "2024",
            semester: "Fall"
        }
    },
    {
        name: "Corey Green",
        number: "0AI23FA",
        alias: "Kardiak",
        line: {
            title: "The 5 Kombatants of Katastrophe",
            subtitle: "Striving to Survive the Fury of the Diamond",
            year: "2023",
            semester: "Fall"
        }
    },
    {
        name: "Godley Pierre",
        number: "1AI23FA",
        alias: "PainKiller",
        line: {
            title: "The 5 Kombatants of Katastrophe",
            subtitle: "Striving to Survive the Fury of the Diamond",
            year: "2023",
            semester: "Fall"
        }
    },
    {
        name: "Chaz Crocket",
        number: "2AI23FA",
        alias: "SurgiKal",
        line: {
            title: "The 5 Kombatants of Katastrophe",
            subtitle: "Striving to Survive the Fury of the Diamond",
            year: "2023",
            semester: "Fall"
        }
    },
    {
        name: "Nicholas Porter",
        number: "3AI23FA",
        alias: "Karnage",
        line: {
            title: "The 5 Kombatants of Katastrophe",
            subtitle: "Striving to Survive the Fury of the Diamond",
            year: "2023",
            semester: "Fall"
        }
    },
    {
        name: "Amir White",
        number: "4AI23FA",
        alias: "IndestruKtible",
        line: {
            title: "The 5 Kombatants of Katastrophe",
            subtitle: "Striving to Survive the Fury of the Diamond",
            year: "2023",
            semester: "Fall"
        }
    },
    {
        name: "Xavier Johnson",
        number: "0AI23SP",
        alias: "SaZuKe",
        line: {
            title: "The 5 Adversaries of Anarchy",
            subtitle: "Kombating the Kalamity of Tradition, while Konserving the Resilience of the Diamond",
            year: "2023",
            semester: "Spring"
        }
    },
    {
        name: "Mohammed Nafiu",
        number: "1AI23SP",
        alias: "KnucKles",
        line: {
            title: "The 5 Adversaries of Anarchy",
            subtitle: "Kombating the Kalamity of Tradition, while Konserving the Resilience of the Diamond",
            year: "2023",
            semester: "Spring"
        }
    },
    {
        name: "Miles Hooper",
        number: "2AI23SP",
        alias: "Deku",
        line: {
            title: "The 5 Adversaries of Anarchy",
            subtitle: "Kombating the Kalamity of Tradition, while Konserving the Resilience of the Diamond",
            year: "2023",
            semester: "Spring"
        }
    },
    {
        name: "Tyrus Pincham",
        number: "3AI23SP",
        alias: "EnKore",
        line: {
            title: "The 5 Adversaries of Anarchy",
            subtitle: "Kombating the Kalamity of Tradition, while Konserving the Resilience of the Diamond",
            year: "2023",
            semester: "Spring"
        }
    },
    {
        name: "Kottrell Davis",
        number: "4AI23SP",
        alias: "The 4th HoKage",
        line: {
            title: "The 5 Adversaries of Anarchy",
            subtitle: "Kombating the Kalamity of Tradition, while Konserving the Resilience of the Diamond",
            year: "2023",
            semester: "Spring"
        }
    },
    {
        name: "Zack Burke",
        number: "0AI21FA",
        alias: "Shaka Zulu",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Zachary Simmons",
        number: "1AI21FA",
        alias: "Floki",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Chandler Hines",
        number: "2AI21FA",
        alias: "Doktor Strange",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Toryron Brown",
        number: "3AI21FA",
        alias: "Samson the Konqueror",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Cleveland Horton III",
        number: "4AI21FA",
        alias: "Ackilles",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Rashashim Gafney",
        number: "5AI21FA",
        alias: "Lord Stark",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Keith Parker",
        number: "6AI21FA",
        alias: "Mr. Fantastik",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Anthony Dow",
        number: "7AI21FA",
        alias: "The Kraken",
        line: {
            title: "The 8 Krusaders of the Kavalry",
            subtitle: "Reestablishing the Resolve of Tradition, to Preserve the Perfection of the Diamond",
            year: "2021",
            semester: "Fall"
        }
    },
    {
        name: "Stephen Hunte III",
        number: "0AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Joshua Wilks",
        number: "1AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Reginald Clemons II",
        number: "2AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Justin Spencer",
        number: "3AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Jiair Jackson",
        number: "4AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Buford Stennis III",
        number: "5AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Simphiwe Denalane",
        number: "6AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Brandon Holmes",
        number: "7AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Cherif Haidara",
        number: "8AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Michal Bowry",
        number: "9AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Julius Harvey",
        number: "10AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Kishore Comrie",
        number: "11AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Justyn Alexander",
        number: "12AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },
    {
        name: "Javan Stewart",
        number: "13AI18FA",
        alias: null,
        line: {
            title: "The 14 Revenants of Parnassus",
            subtitle: "ReKonstruKting the Metamorphosis Of Traditions, While Konsoling the Konvulsion of the Diamond",
            year: "2018",
            semester: "Fall"
        }
    },

    // 2016 Fall Line: 14 Regents of Reformation
    {
        name: "Marquis Irving",
        number: "0AI16FA",
        alias: null,
        line: {
            title: "14 Regents of Reformation",
            subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
            year: "2016",
            semester: "Fall"
        }
    },
    {
        name: "Sean Osbourne",
        number: "1AI16FA",
        alias: null,
        line: {
            title: "14 Regents of Reformation",
            subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
            year: "2016",
            semester: "Fall"
        }
    },
    {
        name: "Jonathan Mckinney",
        number: "2AI16FA",
        alias: null,
        line: {
            title: "14 Regents of Reformation",
            subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
            year: "2016",
            semester: "Fall"
        }
    },
    [
        // 2016 Fall Line: 14 Regents of Reformation (continued)
        {
            name: "Emmanuel Shedu",
            number: "3AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Thadeuss Mitchell",
            number: "4AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Habib Durodola",
            number: "5AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Jarron Williams",
            number: "6AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Shawn Elliot",
            number: "7AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Justin Moore",
            number: "8AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Michael Ragland Jr.",
            number: "9AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Daniel Olumese",
            number: "10AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Frantz Sabbat",
            number: "11AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Oluwatomisine Enitan",
            number: "12AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
        {
            name: "Diara Woodard",
            number: "13AI16FA",
            alias: null,
            line: {
                title: "14 Regents of Reformation",
                subtitle: "Rising through the Khaos while Reassuring the Revitalizing of the Diamond",
                year: "2016",
                semester: "Fall"
            }
        },
    
        // 2013 Fall Line: 9 ExeKUTioners of Egality
        {
            name: "Harold Lamour",
            number: "0AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Johnathan Williams",
            number: "1AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Joshua N Tutman",
            number: "2AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Saquon T Frazier",
            number: "3AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Marcus W Clinton",
            number: "4AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Michael C James",
            number: "5AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Harold O Ogunbo",
            number: "6AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Wayne A Mitchell Jr.",
            number: "7AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        {
            name: "Wesley Redfearn Jr.",
            number: "8AI13FA",
            alias: null,
            line: {
                title: "9 ExeKUTioners of Egality",
                subtitle: "Preserving the Pressure of Perfektion While Mastering the Magnifikation of the Diamond",
                year: "2013",
                semester: "Fall"
            }
        },
        
        
    ]
];

// IIFE to avoid polluting global namespace
(function() {
    // Create chat toggle button (diamond shape)
    const toggleButton = document.createElement('button');
    toggleButton.id = 'chat-toggle';
    toggleButton.innerHTML = `<div id="chat-toggle-inner">AI</div>`;
    document.body.appendChild(toggleButton);
    
    // Create chatbot HTML structure
    const chatbotHTML = `
        <div id="fraternity-chatbot">
            <div class="message-header">
                <span>The Arrogant Individual - Brother Verifier</span>
                <button id="minimize-chat">−</button>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input-container">
                <input type="text" id="chat-input" placeholder="Search for a brother...">
                <button id="send-button">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // Insert chatbot into the DOM
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer.firstElementChild);
    
    // Get DOM elements
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const minimizeButton = document.getElementById('minimize-chat');
    const chatbot = document.getElementById('fraternity-chatbot');
    const chatToggle = document.getElementById('chat-toggle');
    let isMinimized = false;
    let isChatVisible = false;

    // Custom responses for specific queries
    const customResponses = {
        'are the brothers good': "Kappa Alpha Psi is a non-hazing fraternity, but them brothers of Alpha Iota (AI)... THEY ARE GOOODDD! 🔥",
        'how are the brothers': "Kappa Alpha Psi is a non-hazing fraternity, but them brothers of Alpha Iota (AI)... THEY ARE GOOODDD! 🔥",
        'what about the brothers': "Kappa Alpha Psi is a non-hazing fraternity, but them brothers of Alpha Iota (AI)... THEY ARE GOOODDD! 🔥"
    };

    // Dragging functionality variables
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return typingDiv;
    }

    function addMessage(text, isUser = false, includeTime = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        // Create message content container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Add avatar for bot messages
        if (!isUser) {
            const avatar = document.createElement('div');
            avatar.className = 'bot-avatar';
            avatar.innerHTML = 'AI'; // Alpha Iota initials
            messageDiv.appendChild(avatar);
        }
        
        // Format brother information if it's a result message
        if (!isUser && typeof text === 'object' && text.type === 'brother-info') {
            const brother = text.data;
            
            contentDiv.innerHTML = `
                <span>Found a brother matching your search:</span>
                <div class="member-card">
                    <div class="member-card-title">${brother.name || 'Unknown'}</div>
                    <div class="member-card-detail">
                        <span class="detail-label">Line Number:</span>
                        <span class="detail-value">${brother.number || 'N/A'}</span>
                    </div>
                    <div class="member-card-detail">
                        <span class="detail-label">Line:</span>
                        <span class="detail-value">${brother.line && brother.line.title ? brother.line.title : 'N/A'}</span>
                    </div>
                    <div class="member-card-detail">
                        <span class="detail-label">Year:</span>
                        <span class="detail-value">${brother.line && brother.line.year ? brother.line.year + ' ' + brother.line.semester : 'N/A'}</span>
                    </div>
                    ${brother.line && brother.line.subtitle ? `
                    <div class="member-card-detail">
                        <span class="detail-label">Subtitle:</span>
                        <span class="detail-value">${brother.line.subtitle}</span>
                    </div>` : ''}
                    ${brother.alias ? `
                    <div class="member-card-detail">
                        <span class="detail-label">Alias:</span>
                        <span class="detail-value">${brother.alias}</span>
                    </div>` : ''}
                </div>
            `;
        } else {
            contentDiv.textContent = text;
        }
        
        // Add timestamp if requested
        if (includeTime) {
            const time = document.createElement('div');
            time.className = 'message-info';
            time.textContent = getFormattedTime();
            contentDiv.appendChild(time);
        }
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function searchBrother(query) {
        const searchTerm = query.toLowerCase().trim();
        
        // Check for custom responses first
        if (customResponses[searchTerm]) {
            return customResponses[searchTerm];
        }

        const results = [];
        
        try {
            // Search through all brothers in our hardcoded database
            for (const brother of brothersDatabase) {
                // Check for match in name, line number, or alias
                if ((brother.name && brother.name.toLowerCase().includes(searchTerm)) || 
                    (brother.number && brother.number.toLowerCase().includes(searchTerm)) ||
                    (brother.alias && brother.alias.toLowerCase().includes(searchTerm))) {
                    
                    results.push({
                        type: 'brother-info',
                        data: brother
                    });
                }
            }
        } catch (error) {
            console.error("Error searching brother data:", error);
            return "I encountered an error while searching. Please try again.";
        }
        
        if (results.length > 0) {
            return results;
        } else {
            return "I couldn't find any brothers matching that name or line number. Please try a different search term.";
        }
    }

    function handleSearch(query) {
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        // Simulate search delay for natural interaction
        setTimeout(() => {
            try {
                // Remove typing indicator
                if (typingIndicator && typingIndicator.parentNode) {
                    typingIndicator.remove();
                }
                
                // Search for the query
                const results = searchBrother(query);
                
                // Display results
                if (Array.isArray(results)) {
                    // Limit results to avoid flooding the chat
                    const limitedResults = results.slice(0, 3);
                    limitedResults.forEach(result => {
                        addMessage(result);
                    });
                    
                    // If there are more results, notify the user
                    if (results.length > 3) {
                        addMessage(`Found ${results.length} brothers matching "${query}". Showing the first 3 results. Please refine your search for more specific results.`);
                    }
                } else {
                    addMessage(results);
                }
            } catch (error) {
                console.error("Error handling search:", error);
                
                // Remove typing indicator if it's still there
                if (typingIndicator && typingIndicator.parentNode) {
                    typingIndicator.remove();
                }
                
                addMessage("I encountered an error while processing your search. Please try again.");
            }
        }, 800);
    }

    // Toggle chat visibility
    function toggleChat() {
        isChatVisible = !isChatVisible;
        if (isChatVisible) {
            chatbot.classList.add('visible');
            chatToggle.classList.add('active');
            
            // If this is the first time opening, add welcome message
            if (chatMessages.children.length === 0) {
                setTimeout(() => {
                    addMessage("Welcome to The Arrogant Individual! Search for a brother by name or line number to verify their membership.");
                }, 300);
            }
        } else {
            chatbot.classList.remove('visible');
            chatToggle.classList.remove('active');
        }
    }

    // Handle drag start
    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target.closest('.message-header')) {
            isDragging = true;
            chatbot.classList.add('dragging');
        }
    }

    // Handle dragging
    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            // Ensure chatbot stays within viewport bounds
            const rect = chatbot.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (currentX < 0) currentX = 0;
            if (currentY < 0) currentY = 0;
            if (currentX + rect.width > viewportWidth) currentX = viewportWidth - rect.width;
            if (currentY + rect.height > viewportHeight) currentY = viewportHeight - rect.height;

            setTranslate(currentX, currentY, chatbot);
        }
    }

    // Handle drag end
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        chatbot.classList.remove('dragging');
    }

    // Set the transform property
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function handleMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            handleSearch(message);
            chatInput.value = '';
        }
    }

    // Event Listeners
    chatToggle.addEventListener('click', toggleChat);
    
    sendButton.addEventListener('click', handleMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleMessage();
        }
    });

    minimizeButton.addEventListener('click', () => {
        toggleChat(); // Just hide the chat instead of minimizing
    });

    // Add event listeners for dragging
    chatbot.addEventListener("touchstart", dragStart, false);
    chatbot.addEventListener("touchend", dragEnd, false);
    chatbot.addEventListener("touchmove", drag, false);

    chatbot.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mousemove", drag, false);
    document.addEventListener("mouseup", dragEnd, false);
})();