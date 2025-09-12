async function fetchBooks(query) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 50
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;
    const REST_API_KEY = "5d784614d288ce4c039619a07b7cd127";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}

async function bookData() {
    try {

        const querys = ["자바스크립트", '강아지', '정원', '경제','생활','사과','파리','한국','요리','육아'
            ,'취미','사랑','운동','철학','데이터분석','역사'
        ];

        for (let i = 0; i < querys.length; i++) {
            const data = await fetchBooks(querys[i]);
            console.log(data);
            // .box 요소 전체 선택
            const boxElements = document.querySelectorAll(".section4_mid_box");
            console.log(boxElements)

            // documents 데이터를 각 box에 대응하여 렌더링
            // boxElements.forEach((box, i) => {
            const doc = data.documents[0];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // <img>
            const img = document.createElement("img");
            img.src = doc.thumbnail;
            boxElements[i].appendChild(img);

            // <h3> 제목
            const h3 = document.createElement("h3");
            h3.textContent = doc.title;
            boxElements[i].appendChild(h3);

            // // <h6> 저자
            // const h6 = document.createElement("h6");
            // h6.textContent = doc.authors;
            // boxElements[i].appendChild(h6);

            // });
        }

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();

const tabItems = document.querySelectorAll('.section4_mid li');
const section4_mid_adspages = document.querySelectorAll('.section4_mid_adspage');

console.log(section4_mid_adspages)

tabItems.forEach((section4_mid_adspage, i) => {
    section4_mid_adspage.addEventListener('click', () => {
        // 탭에 해당하는 리스트 보이고, 나머지는 숨기기
        section4_mid_adspages.forEach((section4_mid_adspage, j) => {
            section4_mid_adspage.style.display = (i === j) ? 'flex' : 'none';
        });

        // 제목 텍스트 변경
        // titleList.textContent = tab.textContent;

    });
});