export default class AudioControl{

    public async playAudioClip(clip:HTMLAudioElement, volume:number = 1):Promise<true>{
        clip.pause();
        clip.volume = volume;
        clip.currentTime = 0;
        await clip.play();
        return true;
    }
}