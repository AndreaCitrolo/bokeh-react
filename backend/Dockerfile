FROM ubuntu:18.04 as development

ARG username=automatic
ARG uid=1000
ARG gid=100
ENV USER $username
ENV UID $uid
ENV GID $gid
ENV HOME /home/$USER
RUN adduser --disabled-password \
    --gecos "Non-root user" \
    --uid $UID \
    --gid $GID \
    --home $HOME \
    $USER

RUN apt-get -y update && apt-get -y upgrade \ 
    && apt-get -y install wget \
    && mkdir /app \
    && chown -R ${UID}:${GID} /app
     

USER ${USER}

ENV MINICONDA_VERSION 4.9.2
ENV CONDA_DIR $HOME/miniconda3
ENV PATH=$CONDA_DIR/bin:$PATH

COPY ./environment.yml $HOME/environment.yml

RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py39_$MINICONDA_VERSION-Linux-x86_64.sh -O ~/miniconda.sh \
    && chmod +x ~/miniconda.sh \ 
    && ~/miniconda.sh -b -p $CONDA_DIR \ 
    && rm ~/miniconda.sh \
    && conda-env create -f ~/environment.yml

WORKDIR /app

ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "plotter", "python", "manage.py"]

CMD ["runserver", "0.0.0.0:8080"]

