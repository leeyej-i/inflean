const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
    let pageYOffset = window.pageYOffset;

    if (pageYOffset !== 0) {
        backToTop.classList.add('show');
    }
    else {
        backToTop.classList.remove('show');
    }
}

const moveBackToTop = () => {
    if (window.pageYOffset > 0){
        window.scrollTo({top:0, behavior:"smooth"})

    }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);


/*--------------------------------------------------------------------*/
function transformNext(event){
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li')

    //왼쪽으로 넘쳤을 때
    if (Number(activeLi) < 0){
        activeLi = Number(activeLi) + 260; //왼쪽으로 이동했으니까 data-position(시작위치)값 더하기
        //왼쪽 버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-next-hover');
        slidePrev.addEventListener('click', transformPrev);
        // 오늘쪽 버튼이 비활성화되어야 하는 경우
        if (Number(activeLi)== 0){
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext)
        }
    }
    //반영
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)' ;
    classList.setAttribute('data-position', activeLi);
}

function transformPrev(event) {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    //ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li')

    //오른쪽으로 넘쳤을 때
    if (classList.clientWidth < (liList.length * 260 + Number(activeLi))){
        activeLi = Number(activeLi) - 260; //오른쪽으로 이동했으니까 data-position(시작위치)값 빼주기
        //오른쪽 버튼 활성화
        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transformNext)

        // 왼쪽버튼이 비활성화되어야 하는 경우
        if (classList.clientWidth > (liList.length*260 + Number(activeLi))){
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev)
        }
    }
    //반영
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)' ;
    classList.setAttribute('data-position', activeLi);
}

const slidePrevList = document.getElementsByClassName('slide-prev')

for (let i = 0; i < slidePrevList.length; i++){
    //ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling
    let liList = classList.getElementsByTagName('li');

    //카드가 ul태그 너비보다 넘치면, 왼쪽 버튼 활성화 + 오른쪽은 처음 카드 위치이므로 비활성화
    if (classList.clientWidth < liList.length * 260) {
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformPrev);
    } else { //안넘으면 버튼 두개다 삭제
        /* removeChild는 부모요소에서 삭제해야함 */
        const arrowContainer = slidePrevList[i].parentElement
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }
}
/*----------------------------------------------------------------------*/
