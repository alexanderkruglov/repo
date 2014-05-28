$(document).ready(function(){
    CreateBoard();
    CreateChess();

    $('.block').on('click',function(){
        if ($(this).attr('color')==thisteam.current){
		DropAllowedStep();
            SelectCell($(this));
            if ($selectedCell.attr('type')=='pawn'){
                PawnStep();
            }
          if ($selectedCell.attr('type')=='Rook'){
               RookStep();
            }
            if ($selectedCell.attr('type')=='Bishop'){
			    BishopStep(-1,1,-1,8); //������-������
                BishopStep(-1,-1,-1,-1); //������-�����
                BishopStep(1,1,8,8); //���-������
                BishopStep(1,-1,8,-1);//���-�����
            }
            if ($selectedCell.attr('type')=='Queen'){
          
                RookStep();
			  	BishopStep(-1,1,-1,8); //������-������
                BishopStep(-1,-1,-1,-1); //������-�����
                BishopStep(1,1,8,8); //���-������
                BishopStep(1,-1,8,-1);//���-�����
				
            }
            if ($selectedCell.attr('type')=='Knight'){
               KnightStep(-2, -1); 
                KnightStep(-2, 1);
                KnightStep(2, 1);
                KnightStep(2, -1);
                KnightStep(-1, 2);
                KnightStep(1, 2);
                KnightStep(-1, -2);
                KnightStep(1, -2); 
				
            }
			if ($selectedCell.attr('type')=='King') {
				KingStep();
			}
        }
        else{
            if ($selectedCell != null){
                Move($(this));
            }
        }
    })
})
function CreateBoard(){
    var board = $('#board');
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) {
                board.append ($('<div class="s_kl block"> </div>').attr("x",i).attr("y",j));
            } else {
                board.append ($('<div class="t_kl block"> </div>').attr("x",i).attr("y",j));
            }
        }
    }
}

function CreateChess(){
    var cell = $('.block');
    //��������� ������� �� �����
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            //�����
            if (i == 1) {
                AddFigure(i,j, '<img  src="figures/dark/Black_P.ico">','black','pawn');

            } else if (i == 6) {
                AddFigure (i,j, '<img src="figures/light/White_P.ico">','white','pawn');
            }
            //������
            if (i == 0){
                if (j == 0 || j == 7)  {
                    AddFigure(i,j, '<img src="figures/dark/Black_R.ico">','black','Rook');
                }
                else if (j == 1 || j == 6) {
                    AddFigure(i,j,'<img src="figures/dark/Black_N.ico">','black','Knight');
                }
                else if (j == 2 || j == 5) {
                    AddFigure (i, j, '<img src="figures/dark/Black_B.ico">','black','Bishop');
                }
                else if (j == 3) {
                    AddFigure (i, j, '<img src="figures/dark/Black_Q.ico">','black','Queen');
                } else if (j == 4) {
                    AddFigure(i,j,'<img src="figures/dark/Black_K.ico">','black','King');
                }
            }
            //�����
            if (i == 7){
                if (j == 0 || j == 7)  {
                    AddFigure(i,j, '<img src="figures/light/White_R.ico">','white','Rook');
                }
                else if (j == 1 || j == 6) {
                    AddFigure(i,j,'<img src="figures/light/White_N.ico">','white','Knight');
                }
                else if (j == 2 || j == 5) {
                    AddFigure (i, j, '<img src="figures/light/White_B.ico">','white','Bishop');
                }
                else if (j == 3) {
                    AddFigure (i, j, '<img src="figures/light/White_Q.ico">','white','Queen');
                } else if (j == 4) {
                    AddFigure(i,j,'<img src="figures/light/White_K.ico">','white','King');
                }
            }
        }
    }
}
//������� �����
function AddFigure (x,y,_figureType,_color,_type) {
    $('[x='+x+']'+'[y='+y+']').append(_figureType);
    $('[x='+x+']'+'[y='+y+']').attr('type',_type).attr('color',_color);
} 
//�������� �� ������� ������
function IsCellEmpty(cell){
    if ($(cell).find('img').length == 0){ //��� ��� ������
        return true;
    }
    else{
        return false;
    }
}

var thisteam = {
    white : 'white',
    black : 'black',
    current : 'white', //�������� � �����
    enemy:  'black'
}
function ChangeTeam(){
Shah();
    if (thisteam.current == 'white') {
        thisteam.current='black';
        thisteam.enemy='white';
    }
    else   {
        thisteam.current='white';
        thisteam.enemy='black';
    }
	Mat();
}

var $selectedCell;
var is_selected=false;

function SelectCell(cell){
    is_selected = true;
   // DropAllowedStep();
    if( $selectedCell !=null){
        $selectedCell.toggleClass('active');
    }
    $selectedCell = cell;
    cell.toggleClass('active');
}
function Move(targetCell){
		//Shah();
    if (targetCell.hasClass('allowedStep')) {
        targetCell.attr('color', $selectedCell.attr('color')).attr('type', $selectedCell.attr('type')) //���� ��� ��������� � ������� ������
	$(targetCell).html($selectedCell.find('img'));//� ������� ������ ���� �����
        $selectedCell.removeAttr('color').removeAttr('type'); //������� ��� �� ���, ��� ����
	 $selectedCell.find('img').length = 0; //������� ��������
       $selectedCell.toggleClass('active'); //��������� ���������
        $selectedCell = null;  //������ �� �������, �������
		   ChangeTeam();
        DropAllowedStep();
    }
}
//���������� ���������
function DropAllowedStep(){
    $('div').removeClass('allowedStep').removeClass('attack');
}
//������
	function KingStep(i,j){
	
//�����
if ((($selectedCell.attr('x')-1)>-1)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + $selectedCell.attr('y')+ ']'))){
$('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + $selectedCell.attr('y')+ ']').addClass('allowedStep');
}else{
if (($('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + $selectedCell.attr('y') + ']')).attr('color')==thisteam.enemy){
$('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + $selectedCell.attr('y')+ ']').addClass('allowedStep').addClass('attack');
}
}
 //����
 if ((($selectedCell.attr('x')-(-1))<8)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + $selectedCell.attr('y')+ ']'))){
$('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + $selectedCell.attr('y')+ ']').addClass('allowedStep');
 }else{
 if (($('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + $selectedCell.attr('y') + ']')).attr('color')==thisteam.enemy){
 $('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + $selectedCell.attr('y')+ ']').addClass('allowedStep').addClass('attack');
 }
 } 
 // ������
 if ((($selectedCell.attr('y')-(-1))<8)&&(IsCellEmpty('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']'))){
 $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']').addClass('allowedStep');
 }else{
 if (($('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-(-1)) + ']')).attr('color')==thisteam.enemy){
 $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']').addClass('allowedStep').addClass('attack');
 }
 }

 //�����
 if ((($selectedCell.attr('y')-1)>-1)&&(IsCellEmpty('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']'))){
 $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']').addClass('allowedStep');
 }else{
 if (($('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-1) + ']')).attr('color')==thisteam.enemy){
 $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']').addClass('allowedStep').addClass('attack');
 }
 }
 
 // / ���������
 if ((($selectedCell.attr('x')-1)>-1)&&(($selectedCell.attr('y')-(-1))<8)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']'))){
 $('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']').addClass('allowedStep');
 }else{
 if (($('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-(-1)) + ']')).attr('color')==thisteam.enemy){
 $('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']').addClass('allowedStep').addClass('attack');
 }
 }
 // \���������
 if ((($selectedCell.attr('x')-1)>-1)&&(($selectedCell.attr('y')-1)>-1)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']'))){
 $('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']').addClass('allowedStep');
 }else{
 if (($('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-1) + ']')).attr('color')==thisteam.enemy){
 $('[x=' + ($selectedCell.attr('x')-1) + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']').addClass('allowedStep').addClass('attack');
 }
 }
 
 // \���������
 if ((($selectedCell.attr('x')-(-1))<8)&&(($selectedCell.attr('y')-(-1))<8)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']'))){
 $('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + ($selectedCell.attr('y')-(-1))+ ']').addClass('allowedStep');
 }else{
 if (($('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + ($selectedCell.attr('y')-(-1)) + ']')).attr('color')==thisteam.enemy){
 $('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' +	($selectedCell.attr('y')-(-1))+ ']').addClass('allowedStep').addClass('attack');
}
 }
 // /���������
 if ((($selectedCell.attr('x')-(-1))<8)&&(($selectedCell.attr('y')-1)>-1)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']'))){
 $('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']').addClass('allowedStep');
 }else{
 if (($('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + ($selectedCell.attr('y')-1) + ']')).attr('color')==thisteam.enemy){
 $('[x=' + ($selectedCell.attr('x')-(-1)) + ']' + '[y=' + ($selectedCell.attr('y')-1)+ ']').addClass('allowedStep').addClass('attack');
 }
} 
 }
//����
function KnightStep(i,j){ 
	 if (((($selectedCell.attr('x')-i)>0)&&(($selectedCell.attr('y')-(-j))<8)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-i) + ']' + '[y=' + ($selectedCell.attr('y')-(-j))+ ']'))) || (($selectedCell.attr('x')-i)>0)&&(($selectedCell.attr('y')-(-j))>-1)&&(IsCellEmpty('[x=' + ($selectedCell.attr('x')-i) + ']' + '[y=' + ($selectedCell.attr('y')-(-j))+ ']'))){ 
	 $('[x=' + ($selectedCell.attr('x')-i) + ']' + '[y=' + ($selectedCell.attr('y')-(-j))+ ']').addClass('allowedStep');
	 }else{
        if (($('[x=' + ($selectedCell.attr('x')-i) + ']' + '[y=' + ($selectedCell.attr('y')-(-j)) + ']')).attr('color')==thisteam.enemy){
            $('[x=' + ($selectedCell.attr('x')-i) + ']' + '[y=' + ($selectedCell.attr('y')-(-j))+ ']').addClass('attack').addClass('allowedStep');
        } 
	}
	}
	//����
function BishopStep(i,j,a,b) {
    while ((($selectedCell.attr('x') - (-i)) != a)&& (($selectedCell.attr('y') - (-j)) != b) && (IsCellEmpty('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + ($selectedCell.attr('y') - (-j)) + ']'))) {
        ($('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + ($selectedCell.attr('y') - (-j)) + ']')).addClass('allowedStep');
        if (i < 0){ i--;}
        if (i > 0){ i++;}
        if (j < 0){ j--;}
        if (j > 0){ j++;}
    } //�����
    if ((($selectedCell.attr('x') - (-i))!=a)&&(($selectedCell.attr('y') - (-j))!=b)&&(IsCellEmpty(('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + ($selectedCell.attr('y') - (-j)) + ']'))==false)&&(($('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + ($selectedCell.attr('y') - (-j)) + ']')).attr('color')==thisteam.enemy)){
        ($('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + ($selectedCell.attr('y') - (-j)) + ']')).addClass('attack').addClass('allowedStep');
    }
 }
//�����
function PawnStep(){
    if ($selectedCell.attr('color') == 'white') {

        if ($selectedCell.attr('x') == 6) {
            if ($('[x=' + ($selectedCell.attr('x') - 2) + ']' + '[y=' + $selectedCell.attr('y') + ']').find('img').length == 0){
            $('[x=' + ($selectedCell.attr('x') - 2) + ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('allowedStep');
            }
        }
        // �� �������� ��� ���� ������� ������
        if ($('[x=' + ($selectedCell.attr('x') - 1) + ']' + '[y=' +  $selectedCell.attr('y') + ']').find('img').length == 0){
            $('[x=' + ($selectedCell.attr('x') - 1) + ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('allowedStep');
        }

        //���������   \
        if ( $('[x=' + ($selectedCell.attr('x') - 1) + ']' + '[y=' + ($selectedCell.attr('y')-1) + ']').attr('color')=='black') {
            $('[x=' + ($selectedCell.attr('x') - 1) + ']' + '[y=' + ($selectedCell.attr('y') - 1) + ']').addClass('allowedStep').addClass('attack');
        }
        //��������� /
        if ( $('[x=' + ($selectedCell.attr('x') - 1) + ']' + '[y=' + ($selectedCell.attr('y')-(-1)) + ']').attr('color')=='black') {
            $('[x=' + ($selectedCell.attr('x') - 1) + ']' + '[y=' + ($selectedCell.attr('y') - (-1)) + ']').addClass('allowedStep').addClass('attack');
        }
    }
//������
    if($selectedCell.attr('color') == 'black') {
        if ($selectedCell.attr('x') == 1) {
            if ($('[x=' +($selectedCell.attr('x')-(-2))+ ']' + '[y=' + $selectedCell.attr('y') + ']').find('img').length == 0) {
            $('[x=' +($selectedCell.attr('x')-(-2))+ ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('allowedStep');
            }
        }
        
        if ($('[x=' + ($selectedCell.attr('x') - (-1)) + ']' + '[y=' + $selectedCell.attr('y') + ']').find('img').length == 0) {
            $('[x=' + ($selectedCell.attr('x') - (-1)) + ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('allowedStep');
        }
       
        if ( $('[x=' + ($selectedCell.attr('x') - (-1)) + ']' + '[y=' + ($selectedCell.attr('y')-1) + ']').attr('color')=='white') {
            $('[x=' + ($selectedCell.attr('x') - (-1)) + ']' + '[y=' + ($selectedCell.attr('y') - 1) + ']').addClass('allowedStep').addClass('attack');
        }

     
        if ( $('[x=' + ($selectedCell.attr('x') - (- 1)) + ']' + '[y=' + ($selectedCell.attr('y')-(-1)) + ']').attr('color')=='white') {
            $('[x=' + ($selectedCell.attr('x') - (-1)) + ']' + '[y=' + ($selectedCell.attr('y') - (-1)) + ']').addClass('allowedStep').addClass('attack');
        }
    }
}
//�����
function RookStep(i,j,a,b){
    // �� ���������
    // ����� 
    var i =1;
    if ($selectedCell.attr('x') !=0) {
        while ((($selectedCell.attr('x') - i)!=-1)&&(IsCellEmpty(('[x=' + ($selectedCell.attr('x') - i) + ']' + '[y=' + $selectedCell.attr('y') + ']')))) {
            $('[x=' + ($selectedCell.attr('x') - i) + ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('allowedStep');
            i++;
        }
        // attack (not end of board + not empty + enemy)
        if ((($selectedCell.attr('x') - i)!=-1)&&(IsCellEmpty(('[x=' + ($selectedCell.attr('x') - i) + ']' + '[y=' + $selectedCell.attr('y') + ']'))==false)&&(($('[x=' + ($selectedCell.attr('x') - i) + ']' + '[y=' + $selectedCell.attr('y') + ']')).attr('color')==thisteam.enemy)){
            $('[x=' + ($selectedCell.attr('x') - i) + ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('attack').addClass('allowedStep');
        }
    }
    //����
    var i =1;
    if ($selectedCell.attr('x') !=7){
        while ((($selectedCell.attr('x') - (-i))!=8)&&(IsCellEmpty(('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + $selectedCell.attr('y') + ']')))) {
            $('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('allowedStep');
            i++;
        }
        //attack
        if ((($selectedCell.attr('x') - (-i))!=8)&&(IsCellEmpty(('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + $selectedCell.attr('y') + ']'))==false)&&(($('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + $selectedCell.attr('y') + ']')).attr('color')==thisteam.enemy)){
            $('[x=' + ($selectedCell.attr('x') - (-i)) + ']' + '[y=' + $selectedCell.attr('y') + ']').addClass('attack').addClass('allowedStep');
        }
    }

    // �� �����������
    // ������ 
    var i = 1;
    if ($selectedCell.attr('y') !=7){
        while ((($selectedCell.attr('y') - (-i))!=8)&&(IsCellEmpty(('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') -(-i))+ ']')))) {
            $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') - (-i))+ ']').addClass('allowedStep');
            i++;
        }
        //attack
        if ((($selectedCell.attr('y') - (-i))!=8)&&(IsCellEmpty(('[x=' + $selectedCell.attr('x') + ']' + '[y=' + $selectedCell.attr('y') + ']'))==false)&&(($('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y')-(-i))+ ']')).attr('color')==thisteam.enemy)){
            $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') -(-i))+ ']').addClass('attack').addClass('allowedStep');
        }
    }
    // �����
    var i = 1;
    if ($selectedCell.attr('y') !=0) {
        while ((($selectedCell.attr('y') - i) != -1) && (IsCellEmpty(('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') - i) + ']')))) {
            $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') - i) + ']').addClass('allowedStep');
            i++;
        }
        if ((($selectedCell.attr('y') - i) != -1) && (IsCellEmpty(('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') - i) + ']')) == false) && (($('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') - i) + ']')).attr('color') == thisteam.enemy)) {
            $('[x=' + $selectedCell.attr('x') + ']' + '[y=' + ($selectedCell.attr('y') - i) + ']').addClass('attack').addClass('allowedStep');
        }
    }
}
function Shah() {
$myTeam = $('div[color="'+thisteam.current +'"]')
$myTeam.each(function () {
if ($(this).attr('color')==thisteam.current){
SelectCell($(this));
if ($selectedCell.attr('type')=='pawn'){
PawnStep();
}
if ($selectedCell.attr('type')=='Rook'){
RookStep();
}
if ($selectedCell.attr('type')=='Bishop'){
				BishopStep(-1,1,-1,8); //������-������
                BishopStep(-1,-1,-1,-1); //������-�����
                BishopStep(1,1,8,8); //���-������
                BishopStep(1,-1,8,-1);//���-�����
}
if ($selectedCell.attr('type')=='Queen'){
				BishopStep(-1,1,-1,8); //������-������
                BishopStep(-1,-1,-1,-1); //������-�����
                BishopStep(1,1,8,8); //���-������
                BishopStep(1,-1,8,-1);//���-�����
				RookStep();
}
if ($selectedCell.attr('type')=='Knight'){
				KnightStep(-2, -1); 
                KnightStep(-2, 1);
                KnightStep(2, 1);
                KnightStep(2, -1);
                KnightStep(-1, 2);
                KnightStep(1, 2);
                KnightStep(-1, -2);
                KnightStep(1, -2); 
}
if ($selectedCell.attr('type')=='King'){
KingStep();
}
}
})
var king=($('div[type="King"]'+'[color="'+thisteam.enemy+'"]'));
if (king.hasClass('allowedStep')){
DropAllowedStep()
alert('Shah!'+thisteam.enemy+'! ');
}
$selectedCell.removeClass('active')
$selectedCell=null;
DropAllowedStep()


}
function Mat() {
    
    $myTeam = $('div[color="'+thisteam.current +'"]')
    $myTeam.each(function () {
        if ($(this).attr('color')==thisteam.current){
            SelectCell($(this));
            if ($selectedCell.attr('type')=='pawn'){
                PawnStep();
            }
            if ($selectedCell.attr('type')=='Rook'){
                RookStep();
            }
            if ($selectedCell.attr('type')=='Bishop'){
                BishopStep(-1,1,-1,8); //������-������
                BishopStep(-1,-1,-1,-1); //������-�����
                BishopStep(1,1,8,8); //���-������
                BishopStep(1,-1,8,-1);//���-�����
            }
            if ($selectedCell.attr('type')=='Queen'){
                BishopStep(-1,1,-1,8); //������-������
                BishopStep(-1,-1,-1,-1); //������-�����
                BishopStep(1,1,8,8); //���-������
                BishopStep(1,-1,8,-1);//���-�����
                RookStep();
            }
            if ($selectedCell.attr('type')=='Knight'){
               KnightStep(-2, -1); 
                KnightStep(-2, 1);
                KnightStep(2, 1);
                KnightStep(2, -1);
                KnightStep(-1, 2);
                KnightStep(1, 2);
                KnightStep(-1, -2);
                KnightStep(1, -2); 
            }
            if ($selectedCell.attr('type')=='King'){
                KingStep()
            }
        }
    })
    var king=($('div[type="King"]'+'[color="'+thisteam.enemy+'"]'));
    if (king.hasClass('allowedStep')){
        DropAllowedStep();
        alert('Mat! '+thisteam.current+' win');
location.reload();
    }
    $selectedCell.removeClass('active');
    $selectedCell=null;
   DropAllowedStep()
}