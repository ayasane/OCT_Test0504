# Line Orientation Testの整理

## オリジナルの課題

元々は，以下のBentonのカードブック型の検査

Benton, A. L., Varney, N. R., & Hamsher, K. D. (1978). Visuospatial Judgment: A Clinical Test. Archives of Neurology, 35(6), 364–367.

Bentonのカードブック型の検査をコンピュータで実施できるようにしたのがGurららしい。ただ，その詳細は全く良くわからない（論文にまともに書いてない）。

Gur, R. C., Gur, R. E., Obrist, W. D., Hungerbuhler, J. P., Younkin, D., Rosen, A. D., Skolnick, B. E., & Reivich, M. (1982). Sex and handedness differences in cerebral blood flow during rest and cognitive activity. Science, 217(4560), 659–661.

Gur, R. C., Richard, J., Calkins, M. E., Chiavacci, R., Hansen, J. A., Bilker, W. B., Loughead, J., Connolly, J. J., Qiu, H., Mentch, F. D., Abou-Sleiman, P. M., Hakonarson, H., & Gur, R. E. (2012). Age group and sex differences in performance on a computerized neurocognitive battery in children age 8-21. Neuropsychology, 26(2), 251–265.

Gur, R. C., Richard, J., Hughett, P., Calkins, M. E., Macy, L., Bilker, W. B., Brensinger, C., & Gur, R. E. (2010). A cognitive neuroscience-based computerized battery for efficient measurement of individual differences: standardization and initial construct validation. Journal of Neuroscience Methods, 187(2), 254–262.

元々の課題は，Judgement of Line Orientationと呼ばれるもの。上に２つの傾いた線分，下に１１種類の角度（18度）の扇形の線があって，上２つの角度を下から選ぶもの。
https://www.mindsware.nl/en/product/jlo-judgement-of-line-orientation/

ただ，今回のプロジェクトで使う以下の論文で使っているのは，引用は上記だけど，Line Orientation Testと呼ばれるものらしい(Gurには書いてないきがするけど，Gurでもこっちを使っているかもしれない)。

Basner, M., Savitt, A., Moore, T. M., Port, A. M., McGuire, S., Ecker, A. J., Nasrini, J., Mollicone, D. J., Mott, C. M., McCann, T., Dinges, D. F., & Gur, R. C. (2015). Development and Validation of the Cognition Test Battery for Spaceflight. Aerospace Medicine and Human Performance, 86(11), 942–952.

Line Orientation Testは，Judgement of Line Orientationとは違って，２つの線分が提示されて，それが平行か判断するもの。
https://www.mindsware.nl/en/product/lino-lijn-orientatie-test/

Basner et al (2015)は，以下のように書いており，片方を固定して，もう一方を回転させて平行にする課題を採用している。１２試行らしい。

「The LOT format consists of presenting two lines at a time, one stationary and the other can be rotated by clicking an arrow. Participants rotate the movable line until it is parallel to the stationary line. The current implementation has 12 consecutive line pairs that vary in length and orientation. Difficulty is determined by the length of the rotating line, its distance from the stationary line, and number of degrees that the line rotates with each click. 」

Calamia, M., Markon, K., Denburg, N. L., & Tranel, D. (2011). Developing a short form of Benton’s Judgment of Line Orientation Test: an item response theory approach. The Clinical Neuropsychologist, 25(4), 670–684.

Moore, T. M., Scott, J. C., Reise, S. P., Port, A. M., Jackson, C. T., Ruparel, K., Savitt, A. P., Gur, R. E., & Gur, R. C. (2015). Development of an abbreviated form of the Penn Line Orientation Test using large samples and computerized adaptive test simulation. Psychological Assessment, 27(3), 955–964.

Spencer, R. J., Wendell, C. R., Giggey, P. P., Seliger, S. L., Katzel, L. I., & Waldstein, S. R. (2013). Judgment of Line Orientation: an examination of eight short forms. Journal of Clinical and Experimental Neuropsychology, 35(2), 160–166.


# Penn Web-Based Computerized Neurocognitive Battery (WebCNP) Test Descriptions and Scoring Variables（P48）
この資料が参考になった。

## 課題のルール

- 赤と青の角度の異なる線分が２つでてくる。青色の線を回転させて，赤色の線と平行になるようにする。
- 青色の線分は，１クリックにつき６度回転する（時計回りと反時計周りの２つのボタンがある）。
- 青と赤の位置は，左右で高さが等しい（水平に並ぶ），対角上にある。ただし，２つの線の中心の距離はいつもおなじだった（上半分水平６試行，下半分水平６試行，左上と右下の対角６試行，左下と右上の対角６試行）。
- 青い線は，極小，小，中，大の４つある(各６試行)。赤はいつも大

## 12試行版のための改変
- 線分の位置は，水平（上），水平（下），対角（上），対角（下）の４種でそれぞれ３回＝１２試行
- ２４試行版では，青い線の長さは極小，小，中，大の４つだったが，それでは線分の位置と対応付けられないので，小，中，大の３つにした。つまり，線分の位置４条件のそれぞれに対して，小・中・大の３つの刺激が呈示される。

### 得点化

- 合計正答数（0-12）
- 正答試行の反応時間の中央値
- 誤答試行の反応時間の中央値
- 各試行のクリックごとの平均反応時間の中央値
- 全ての試行の逆転反応の平均値
- 水平呈示（上）の試行での正答反応(0-3)
- 水平呈示（下）の試行での正答反応(0-3)
- 対角呈示（上）の試行での正答反応(0-3)
- 対角呈示（上）の試行での正答反応(0-3)
- 線分（極小）の試行での正答反応(0-3)
- 線分（小）の試行での正答反応(0-3)
- 線分（中）の試行での正答反応(0-3)
- 線分（大）の試行での正答反応(0-3)
- 過剰クリック数の平均（最適クリック数-実際のクリック数）
- 正答試行の過剰クリック数の平均
- 誤答試行の過剰クリック数の平均
- 正答とのズレ（６度ごとなので１試行では最大１５単位のズレ=90度）の合計(０−180(15*12))
- 各試行の正答とのズレ

### 工程
＜完了＞
- 画面を作る<完了>
- 青い線を回転させる<完了>
- timelineVariableで繰り返しをする <もっと泥臭い感じになったけど，動くことには動くようになった＞
- 開始の角度をランダムに決定する（完全にランダム化？疑似ランダム？そもそも固定？）角度のは６の倍数 <暫定的な刺激は作れた>
- 呈示座標をきめる <制御はできるようになった>
- 教示＜暫定版＞
- 角度や長さの情報を保存する（dataで保存できるとおもいきやできない）
- 練習の追加
- 対角線の呈示
