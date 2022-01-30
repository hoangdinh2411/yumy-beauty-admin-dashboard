import React, { useState } from 'react';
import {Button,Input} from 'components';

function UploadCsvFileForm() {
    const [csvFile , setCsvFile ] = useState()
  return <form>
      <Input type="file" accept=".csv" id="csvFile" placeholder="Drag file or Click here" value={csvFile} />
      <Button type="submit"/>
      <Button />
  </form>;
}

export default UploadCsvFileForm;
