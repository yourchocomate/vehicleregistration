import { toast } from "react-hot-toast";

export const motor_class = [
    {
        min: 1,
        max: 100,
        letter: 'এ'
    },
    {
        min: 101,
        max: 125,
        letter: 'হ'
    },
    {
        min: 126,
        max: 165,
        letter: 'ল'
    },
    {
        min: 166,
        max: 1000,
        letter: 'ক'
    },
    {
        min: 1001,
        max: 1300,
        letter: 'খ'
    },
    {
        min: 1301,
        max: 2000,
        letter: 'গ'
    },
    {
        min: 2001,
        max: 5000,
        letter: 'ভ'
    }
]

export const truncate = (str: string, n: number) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

export const copyTextToClipboard = (text: string) => {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    toast.success("Copied to clipboard");
}

export const plateTranslator = (plate: string) => {
    let translated = '';
    const bangla = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < plate.length; i++) {
        const index = english.indexOf(plate[i]);
        if (index !== -1) {
            translated += bangla[index];
        } else {
            translated += plate[i];
        }
    }

    return translated;
}

export const makePlateTitle = (branch: string, cc: string) => {
    let traslatedBranch = '';
    const bangla = ['ঢাকা', 'চট্টগ্রাম', 'খুলনা', 'রাজশাহী', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];
    const english = ['Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'];

    for (let i = 0; i < english.length; i++) {
        if (english[i].toLocaleLowerCase() === branch.toLowerCase()) {
            traslatedBranch = bangla[i];
            break;
        }
    }
    const ccCode = motor_class.find(m => parseInt(cc) >= m.min && parseInt(cc) <= m.max)?.letter;
    return `${traslatedBranch} - ${ccCode}`;
}