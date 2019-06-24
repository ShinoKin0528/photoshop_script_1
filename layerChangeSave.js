//レイヤーグループ設定ダイアログ
var group = new Window("dialog", "変化保存させるレイヤーグループ名を入力してください。", { width: 320, height: 150, x: 500, y: 300 });
group.okBtn = group.add("button", { width: 80, height: 25, x: 165, y: 105 }, "決定", { name: "ok" });
group.cancelBtn = group.add("button", { width: 80, height: 25, x: 75, y: 105 }, "キャンセル", { name: "cancel" });
group.eText = group.add("edittext", { width: 200, height: 30, x: 60, y: 55 }, "aaa");

group.eText.active = true;

//決定が表示された時
group.okBtn.onClick = function () {
  group.close();
  lsObj = activeDocument.layerSets[group.eText.text];
  layerNum = lsObj.artLayers.length;

  //選択したレイヤーグループ内を全て非表示
  for (var v = 0; v < layerNum; v++) {
    //洗濯したレイヤーグループ名内のレイヤー名を取得
    layerName = lsObj.artLayers[v];
    //表示ON
    layerName.visible = false;
  }

  //保存フォルダーを選択
  foldername = Folder.selectDialog("フォルダを選択してください");

  //保存繰り返し処理
  for (var i = 0; i < layerNum; i++) {
    //洗濯したレイヤーグループ名内のレイヤー名を取得
    layerName = lsObj.artLayers[i];
    //表示ON
    layerName.visible = true;

    //保存
    fileObj = new File(foldername + "/export" + i + ".jpg");
    jpegOpt = new JPEGSaveOptions();
    jpegOpt.embedColorProfile = true;
    jpegOpt.quality = 2;
    jpegOpt.formatOptions = FormatOptions.PROGRESSIVE;
    jpegOpt.scans = 3;
    jpegOpt.matte = MatteType.NONE;
    activeDocument.saveAs(fileObj, jpegOpt, true, Extension.LOWERCASE);

    //表示OFF
    layerName.visible = false;
  }
}

//選択ダイアログ表示
group.show();