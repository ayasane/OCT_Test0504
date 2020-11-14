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


12試行がどういう刺激か分からない。フル版ではなく短縮版を検討する。どうも，長さ，角度，回転時の角度の大きさ(3,6,9度)が試行によって異なる。


Calamia, M., Markon, K., Denburg, N. L., & Tranel, D. (2011). Developing a short form of Benton’s Judgment of Line Orientation Test: an item response theory approach. The Clinical Neuropsychologist, 25(4), 670–684.

Moore, T. M., Scott, J. C., Reise, S. P., Port, A. M., Jackson, C. T., Ruparel, K., Savitt, A. P., Gur, R. E., & Gur, R. C. (2015). Development of an abbreviated form of the Penn Line Orientation Test using large samples and computerized adaptive test simulation. Psychological Assessment, 27(3), 955–964.

Spencer, R. J., Wendell, C. R., Giggey, P. P., Seliger, S. L., Katzel, L. I., & Waldstein, S. R. (2013). Judgment of Line Orientation: an examination of eight short forms. Journal of Clinical and Experimental Neuropsychology, 35(2), 160–166.
