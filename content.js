function BharatSankhya() {
    class N2WIndian {
        static zeroTo99 = [];
        static place = 'Thousand|Lakh|Crore|Arab|Kharab|Nil'.split('|');

        static getClass(words) {
            for (let i = this.place.length - 2; i >= 0; i--) {
                const element = this.place[i].toLowerCase();
                words = words.toLowerCase();
                if (words.includes(element)) {
                    return element;
                }
            }

            return '';
        }
        static numberToWords(number) {
            const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
            const digits = number.split('');
            return units[parseInt(digits[0])] + ' ' + units[parseInt(digits[1])];
        }
        static convert(y) {
            const ones = '|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen'.split('|');
            const tens = '||Twenty|Thirty|Forty|Fifty|Sixty|Seventy|Eighty|Ninety'.split('|');
            let x = y.split('.')[0];
            let paisa = '';
            if (y.split('.')[1] !== undefined && y.split('.')[1] != '') {
                let paisaNumber = parseInt(y.split('.')[1]) % 100;

                if (paisaNumber < 10) {
                    paisa = this.numberToWords(paisaNumber.toString() + '0');
                } else {
                    paisa = this.numberToWords(paisaNumber.toString());
                }
            }
            for (let i = 0; i < 100; i++) {
                const t = Math.floor(i / 10);
                const o = i % 10;
                N2WIndian.zeroTo99.push(t < 2 ? ones[i] : tens[t] + (o ? ' ' + ones[o] : ''));
            }

            let n = x.length;
            x = n === 0 ? '00' : n === 1 || n % 2 === 0 ? '0' + x : x;
            n = x.length;
            let r = N2WIndian.zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
            if (n >= 1) {
                const v = N2WIndian.zeroTo99[x.charCodeAt((n -= 1)) - 48];
                if (v) r = v + ' Hundred' + (r ? ' ' + r : '');
            }
            for (let i = 0; n > 0; i++) {
                const v = N2WIndian.zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
                if (v) r = v + ' ' + N2WIndian.place[i] + (r ? ' ' + r : '');
            }
            if (r) {
                if (paisa) {
                    return r + ' • ' + paisa;
                }
                return r;
            } else {
                if (paisa) {
                    return '• ' + paisa;
                }
                return 'Zero';
            }
        }
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const BharatSankhyaPop = document.getElementById('BharatSankhyaPop');
            if (BharatSankhyaPop) {
                document.body.removeChild(BharatSankhyaPop);
            }
        }

        if (e.key === '.' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
            let selection = document.getSelection();
            let range = selection && selection.rangeCount && selection.getRangeAt(0);

            if (!range) {
                return;
            }
            let res = '';
            res = selection.toString().replace(/[^0-9. ]/g, '');
            res = res.replace(/ +/g, ' ');
            res = res.trim();
            let maxString = '999999999999999';
            let toWrite = `Cannot process number. Please select a number between 0 and ${maxString}`;
            if (res != '' && res.length <= maxString.length && !isNaN(res[0])) {
                if (res >= 1000000000) {
                    let afterCrore = parseInt(res / 10000000);
                    let resCroreNum = String((res % 10000000).toFixed(2));
                    let resCrore = N2WIndian.convert(resCroreNum).toLowerCase();
                    let resExtra = N2WIndian.convert(String(afterCrore)).toLowerCase();
                    toWrite = resExtra.replace('rupees', '') + ' crore ' + resCrore;
                } else {
                    toWrite = N2WIndian.convert(res).toLowerCase();
                }
            }
            const BharatSankhyaPop = document.createElement('div');
            const BharatSankhyaPopMain = document.createElement('div');
            BharatSankhyaPopMain.id = 'BharatSankhy-popper-content';
            BharatSankhyaPop.id = 'BharatSankhyaPop';
            BharatSankhyaPop.style.cssText = `
					position: fixed;
					height: 100vh;
					width: 100vw;
					top: 0;
					left: 0;
					border-radius: 5px;
					backdrop-filter: blur(5px);
				`;
            BharatSankhyaPopMain.style.cssText = `
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: white;
					color: #fbfcfc !important;
					height: auto;
					min-height: auto;
					width: 320px;
					border-radius: 8px;
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
					overflow: hidden;
					background-color: #2c2642;
				`;
            //add a header to the pop up BharatSankhyaPopMain
            const BharatSankhyaPopHeader = document.createElement('div');
            BharatSankhyaPopHeader.style.cssText = `
					position: relative;
					background-color: #2c2642;
					color: #fbfcfc !important;
					padding: 10px;
					text-align: left;
					font-size: 1.2em;
					padding-left: 45px;	
				`;
            BharatSankhyaPopHeader.innerHTML = `
					<img src="https://rajnandan1.github.io/Sankhya/images/sankhya_logo256.png" style="width: 30px; height: auto; display: inline; position: absolute;
					top: 5px;
					left: 9px;">
					Sankyha
				`;
            BharatSankhyaPopMain.appendChild(BharatSankhyaPopHeader);

            //add a close button to the header
            const closeBtn = document.createElement('span');
            closeBtn.style.cssText = `
					position: absolute;
					top: 0;
					right: 0;
					padding: 10px;
					cursor: pointer;
				`;
            closeBtn.innerHTML = `
				<svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
					<path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"/>
				</svg>
				`;
            closeBtn.addEventListener('click', function () {
                document.body.removeChild(BharatSankhyaPop);
            });
            BharatSankhyaPopHeader.appendChild(closeBtn);

            //add a content div to the pop up BharatSankhyaPopMain
            const BharatSankhyaPopContent = document.createElement('div');
            BharatSankhyaPopContent.style.cssText = `
					padding: 10px 20px;
					text-align: left;
					font-size: 1.2em;
					color: white;
				`;
            let toWriteMultiLine = toWrite.replaceAll('crore', 'crore<br>').replaceAll('lakh', 'lakh<br>').replaceAll('thousand', 'thousand<br>').replaceAll('hundred', 'hundred<br>').replace('•', '<br>•<br>').replace('nil', 'nil<br>');
            BharatSankhyaPopContent.innerHTML = `
				<p style="color: #349caf !important; text-decoration:underline; text-align:center;text-decoration-thickness: 2px;white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;">${isNaN(res) ? res : Number(res).toLocaleString('en-IN')}</p>
				<span class="textnumber ${N2WIndian.getClass(toWrite)}">${toWriteMultiLine}</span>`;
            BharatSankhyaPopMain.appendChild(BharatSankhyaPopContent);

            //add a copy button that will copy toWrite
            const copyBtn = document.createElement('button');
            copyBtn.id = 'copyBtnbhtsnk';
            copyBtn.style.cssText = `

					background-color: #e75171;
					color: #191919;
					border: 5px solid #2c2642;
					border-radius: 8px;
					padding: 10px;
					cursor: pointer;
					width: 100%;
					font-size: 1.2em;
					font-weight: 500;
					margin-top: 10px;
				`;
            copyBtn.innerHTML = 'COPY';
            copyBtn.addEventListener('click', function (e) {
                e.target.innerHTML = 'COPIED';
                setTimeout(() => {
                    e.target.innerHTML = 'COPY';
                }, 1500);
                navigator.clipboard.writeText(toWrite);
            });
            BharatSankhyaPopMain.appendChild(copyBtn);

            BharatSankhyaPop.appendChild(BharatSankhyaPopMain);
            document.body.appendChild(BharatSankhyaPop);
        }
    });
}

BharatSankhya();
